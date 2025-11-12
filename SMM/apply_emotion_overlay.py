#!/usr/bin/env python3
"""Apply emotion-based color overlays to selected frames and optionally render full video."""

import argparse
import json
import math
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Sequence

import cv2
import numpy as np


@dataclass
class ColorOverlayConfig:
    emotion_id: int
    hex_color: str
    start_time: float
    duration: float
    overlay_type: str = "tint"
    intensity: float = 0.35


HEX_RE = re.compile(r"#?([0-9A-Fa-f]{8})")
EMOTION_MAP_RE = re.compile(r"emotion_map:\s*([^*]+)\*/")
EMOTION_LINE_RE = re.compile(r"\|<-\s*([^:]+):")


def hex_to_rgba(hex_color: str) -> np.ndarray:
    match = HEX_RE.search(hex_color)
    if not match:
        raise ValueError(f"Invalid hex color: {hex_color}")
    value = match.group(1)
    r = int(value[0:2], 16)
    g = int(value[2:4], 16)
    b = int(value[4:6], 16)
    a = int(value[6:8], 16)
    return np.array([r, g, b, a], dtype=np.uint8)


def parse_m_string(path: Path) -> Dict[int, str]:
    text = path.read_text(encoding="utf-8")
    colors: Dict[int, str] = {}

    footer_match = EMOTION_MAP_RE.search(text)
    if footer_match:
        entries = [segment.strip() for segment in footer_match.group(1).split(",") if segment.strip()]
        for entry in entries:
            if "=" not in entry:
                continue
            key, _ = entry.split("=", 1)
            if "@" in key:
                emotion_id, color = key.split("@", 1)
                try:
                    colors[int(emotion_id)] = f"#{color.strip()}" if not color.startswith("#") else color.strip()
                except ValueError:
                    continue

    for match in EMOTION_LINE_RE.finditer(text):
        token = match.group(1)
        if "@" in token:
            id_part, color_part = token.split("@", 1)
            try:
                emo_id = int(id_part.strip())
            except ValueError:
                continue
            if HEX_RE.match(color_part.strip()):
                hex_color = color_part.strip()
                if not hex_color.startswith("#"):
                    hex_color = f"#{hex_color}"
                colors.setdefault(emo_id, hex_color)

    return colors


def load_timeline(path: Optional[Path], default_colors: Sequence[str]) -> List[ColorOverlayConfig]:
    if path and path.exists():
        data = json.loads(path.read_text(encoding="utf-8"))
        configs = [
            ColorOverlayConfig(
                emotion_id=item["emotion_id"],
                hex_color=item["hex"],
                start_time=float(item.get("start_time", 0.0)),
                duration=float(item.get("duration", 0.0)),
                overlay_type=item.get("overlay_type", "tint"),
                intensity=float(item.get("intensity", 0.35)),
            )
            for item in data
        ]
        return configs

    configs: List[ColorOverlayConfig] = []
    if not default_colors:
        return configs
    step = 1.0
    for idx, hex_color in enumerate(default_colors):
        configs.append(
            ColorOverlayConfig(
                emotion_id=idx,
                hex_color=hex_color,
                start_time=float(idx) * step,
                duration=step,
            )
        )
    return configs


def select_color(configs: Sequence[ColorOverlayConfig], timestamp: float) -> Optional[ColorOverlayConfig]:
    for config in configs:
        if config.start_time <= timestamp < config.start_time + config.duration:
            return config
    if configs:
        return configs[-1]
    return None


def create_overlay(frame_shape, rgba: np.ndarray, overlay_type: str, intensity: float) -> np.ndarray:
    h, w = frame_shape[:2]
    overlay = np.zeros((h, w, 3), dtype=np.float32)
    color = rgba[:3].astype(np.float32) / 255.0

    if overlay_type == "radial":
        center = (w / 2.0, h / 2.0)
        max_dist = math.hypot(center[0], center[1])
        y_coords, x_coords = np.indices((h, w))
        distances = np.sqrt((x_coords - center[0]) ** 2 + (y_coords - center[1]) ** 2)
        mask = np.clip(1.0 - distances / max_dist, 0.0, 1.0) ** 1.5
        for c in range(3):
            overlay[:, :, c] = color[c] * mask
    else:
        overlay[:, :, :] = color

    alpha_scale = (rgba[3] / 255.0) * intensity
    return overlay, float(alpha_scale)


def apply_overlay(frame: np.ndarray, rgba: np.ndarray, overlay_type: str, intensity: float) -> np.ndarray:
    overlay, alpha_scale = create_overlay(frame.shape, rgba, overlay_type, intensity)
    frame_norm = frame.astype(np.float32) / 255.0
    blended = (1.0 - alpha_scale) * frame_norm + alpha_scale * overlay
    blended = np.clip(blended * 255.0, 0, 255).astype(np.uint8)
    return blended


def extract_frames(video_path: Path, frame_indices: Sequence[int]) -> Dict[int, np.ndarray]:
    capture = cv2.VideoCapture(str(video_path))
    if not capture.isOpened():
        raise RuntimeError(f"Cannot open video: {video_path}")

    frames: Dict[int, np.ndarray] = {}
    for idx in frame_indices:
        capture.set(cv2.CAP_PROP_POS_FRAMES, idx)
        success, frame = capture.read()
        if success:
            frames[idx] = frame
    capture.release()
    return frames


def create_sprite(frames: Sequence[np.ndarray], output_path: Path, cols: int = 5, scale_width: int = 320) -> None:
    if not frames:
        raise ValueError("No frames to compose into sprite")

    resized = []
    for frame in frames:
        h, w = frame.shape[:2]
        scale = scale_width / float(w)
        resized_frame = cv2.resize(frame, (scale_width, int(h * scale)), interpolation=cv2.INTER_AREA)
        resized.append(resized_frame)

    tile_w, tile_h = resized[0].shape[1], resized[0].shape[0]
    rows = math.ceil(len(resized) / cols)
    sprite = np.zeros((rows * tile_h, cols * tile_w, 3), dtype=np.uint8)

    for idx, frame in enumerate(resized):
        r = idx // cols
        c = idx % cols
        sprite[r * tile_h:(r + 1) * tile_h, c * tile_w:(c + 1) * tile_w] = frame

    output_path.parent.mkdir(parents=True, exist_ok=True)
    cv2.imwrite(str(output_path), sprite)


def render_video(
    video_path: Path,
    output_path: Path,
    configs: Sequence[ColorOverlayConfig],
    overlay_type: str,
    intensity: float,
) -> None:
    capture = cv2.VideoCapture(str(video_path))
    if not capture.isOpened():
        raise RuntimeError(f"Cannot open video: {video_path}")

    fps = capture.get(cv2.CAP_PROP_FPS) or 30.0
    width = int(capture.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(capture.get(cv2.CAP_PROP_FRAME_HEIGHT))
    total_frames = int(capture.get(cv2.CAP_PROP_FRAME_COUNT))

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    writer = cv2.VideoWriter(str(output_path), fourcc, fps, (width, height))

    for frame_idx in range(total_frames):
        success, frame = capture.read()
        if not success:
            break
        timestamp = frame_idx / fps
        config = select_color(configs, timestamp)
        if config:
            rgba = hex_to_rgba(config.hex_color)
            over_type = config.overlay_type or overlay_type
            over_intensity = config.intensity if config.intensity is not None else intensity
            frame = apply_overlay(frame, rgba, over_type, over_intensity)
        writer.write(frame)

    capture.release()
    writer.release()
    print(f"Rendered video saved to {output_path}")


def parse_frame_indices(spec: str) -> List[int]:
    parts = spec.split(",")
    indices: List[int] = []
    for part in parts:
        part = part.strip()
        if not part:
            continue
        if "-" in part:
            start_str, end_str = part.split("-", 1)
            start = int(start_str)
            end = int(end_str)
            indices.extend(list(range(start, end + 1)))
        else:
            indices.append(int(part))
    return indices


def main():
    parser = argparse.ArgumentParser(description="Apply emotion color overlays to selected frames and export sprite")
    parser.add_argument("video", type=Path, help="Input video path")
    parser.add_argument("m_string", type=Path, help="Path to file containing M-string with emotion colors")
    parser.add_argument(
        "--timeline",
        type=Path,
        help="Optional JSON timeline describing overlay segments",
        default=None,
    )
    parser.add_argument(
        "--frames",
        type=str,
        default="0,30,60,90,120",
        help="Comma-separated frame indices (supports ranges e.g. 0-60:10)",
    )
    parser.add_argument(
        "--overlay-type",
        choices=["tint", "radial"],
        default="tint",
        help="Mask style to use when generating overlays",
    )
    parser.add_argument(
        "--intensity",
        type=float,
        default=0.35,
        help="Base overlay intensity (0..1)",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("memory/smm/output/sprite_preview.png"),
        help="Output sprite PNG path",
    )
    parser.add_argument(
        "--render",
        type=Path,
        help="Optional output video path to render full clip with overlays",
        default=None,
    )
    args = parser.parse_args()

    frame_indices = parse_frame_indices(args.frames)
    if not frame_indices:
        raise ValueError("No valid frame indices provided")

    color_map = parse_m_string(args.m_string)
    if not color_map:
        raise RuntimeError("No colors found in M-string")

    default_colors = list(color_map.values())
    timeline = load_timeline(args.timeline, default_colors)

    print(f"Loaded {len(color_map)} colors, {len(timeline)} timeline segments")

    frames = extract_frames(args.video, frame_indices)
    if not frames:
        raise RuntimeError("No frames extracted from video")

    fps_capture = cv2.VideoCapture(str(args.video))
    fps = fps_capture.get(cv2.CAP_PROP_FPS) or 30.0
    fps_capture.release()

    processed_frames: List[np.ndarray] = []

    for idx in frame_indices:
        frame = frames.get(idx)
        if frame is None:
            continue
        timestamp = idx / fps
        config = select_color(timeline, timestamp)
        if config is None:
            processed_frames.append(frame)
            continue
        rgba = hex_to_rgba(config.hex_color)
        over_type = config.overlay_type or args.overlay_type
        over_intensity = config.intensity if config.intensity is not None else args.intensity
        blended = apply_overlay(frame, rgba, over_type, over_intensity)
        processed_frames.append(blended)
        print(f"Frame {idx}: color {config.hex_color}, overlay={over_type}, intensity={over_intensity}")

    create_sprite(processed_frames, args.output)
    print(f"Sprite saved to {args.output}")

    if args.render:
        render_video(args.video, args.render, timeline, args.overlay_type, args.intensity)


if __name__ == "__main__":
    main()
