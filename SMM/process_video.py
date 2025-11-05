#!/usr/bin/env python3
"""
Neuro Video Processor
=====================
Создаёт визуально-философскую обработку видео в стиле "Neuro: Живое зеркало сознания"

Эффекты:
- Bloom/Glow (осознанное внимание)
- Breath rhythm (цикл дыхания)
- Photonic noise (квантовая неопределённость)
- Color shift (трансформация реальности)
- Edge enhancement (границы сознания)
"""

import os
import sys
import numpy as np
from pathlib import Path
from typing import Tuple, Optional
import warnings
warnings.filterwarnings('ignore')

try:
    from moviepy.editor import VideoFileClip, ImageSequenceClip, CompositeVideoClip, AudioFileClip, concatenate_videoclips
    from moviepy.video.fx.all import fadein, fadeout
    import cv2
    from PIL import Image, ImageFilter, ImageEnhance
    from scipy import ndimage
    from scipy.signal import butter, filtfilt
except ImportError as e:
    print(f"❌ Missing dependency: {e}")
    print("📦 Install: pip install moviepy opencv-python numpy pillow scipy")
    sys.exit(1)


# ============================================================================
# ЦВЕТОВАЯ ПАЛИТРА NEURO (глубокие синие, фиолетовые, лазурные)
# ============================================================================
NEURO_PALETTE = {
    'deep_night': np.array([0x03, 0x0b, 0x18]),  # #030b18
    'violet': np.array([0x7d, 0x5b, 0xff]),      # #7d5bff
    'azure': np.array([0x4f, 0xd1, 0xc5]),       # #4fd1c5
    'purple': np.array([0x8b, 0x5c, 0xf6]),      # #8b5cf6
    'dark_blue': np.array([0x1e, 0x3a, 0x8a]),   # #1e3a8a
}


# ============================================================================
# ФИЛЬТРЫ И ЭФФЕКТЫ
# ============================================================================

def glow_filter(frame: np.ndarray, intensity: float = 0.3) -> np.ndarray:
    """
    Усиливает свет, символизируя осознанное внимание.
    Применяет bloom-эффект через размытие и аддитивное смешивание.
    """
    # Gaussian blur для создания свечения
    blurred = cv2.GaussianBlur(frame, (0, 0), sigmaX=intensity * 10, sigmaY=intensity * 10)
    # Аддитивное смешивание для усиления света
    glow = cv2.addWeighted(frame, 1.0, blurred, intensity, 0)
    return np.clip(glow, 0, 255).astype(np.uint8)


def edge_enhancement(frame: np.ndarray, strength: float = 0.2) -> np.ndarray:
    """
    Подчёркивает границы между мыслью и материей.
    Использует Canny edge detection с мягким наложением.
    """
    gray = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)
    edges = cv2.Canny(gray, 50, 150)
    edges_colored = cv2.cvtColor(edges, cv2.COLOR_GRAY2RGB)
    # Мягкое наложение краёв
    enhanced = cv2.addWeighted(frame, 1.0 - strength, edges_colored, strength, 0)
    return np.clip(enhanced, 0, 255).astype(np.uint8)


def color_shift(frame: np.ndarray, t: float) -> np.ndarray:
    """
    Трансформирует реальность в пространство сознания.
    Применяет градиентную цветовую трансформацию в нейронную палитру.
    """
    h, w = frame.shape[:2]
    
    # Создаём градиент от глубокой ночи к фиолетовому
    gradient = np.linspace(0, 1, w)
    gradient = np.tile(gradient, (h, 1))
    
    # Пульсирующая интенсивность трансформации
    pulse = 0.5 + 0.3 * np.sin(t * 0.5)
    
    result = frame.copy().astype(np.float32)
    
    # Смешиваем с нейронной палитрой
    for i in range(3):
        night_val = NEURO_PALETTE['deep_night'][i]
        violet_val = NEURO_PALETTE['violet'][i]
        channel_gradient = night_val + (violet_val - night_val) * gradient
        result[:, :, i] = result[:, :, i] * (1 - pulse * 0.4) + channel_gradient * (pulse * 0.4)
    
    return np.clip(result, 0, 255).astype(np.uint8)


def photonic_noise(frame: np.ndarray, t: float, density: float = 0.01) -> np.ndarray:
    """
    Представляет квантовую неопределённость и случайность.
    Добавляет светящиеся точки, движущиеся по синусоидальному паттерну.
    """
    h, w = frame.shape[:2]
    result = frame.copy().astype(np.float32)
    
    # Генерируем случайные точки с синусоидальным движением
    num_points = int(h * w * density)
    
    for _ in range(num_points):
        x = int(np.random.uniform(0, w))
        y = int(np.random.uniform(0, h))
        
        # Синусоидальное движение
        offset_x = int(5 * np.sin(t * 2 + y * 0.01))
        offset_y = int(5 * np.cos(t * 2 + x * 0.01))
        px = (x + offset_x) % w
        py = (y + offset_y) % h
        
        # Светящаяся точка (лазурный цвет)
        if 0 <= px < w and 0 <= py < h:
            result[py, px, :] = np.minimum(result[py, px, :] + NEURO_PALETTE['azure'] * 0.3, 255)
    
    return np.clip(result, 0, 255).astype(np.uint8)


def breath_rhythm(frame: np.ndarray, t: float, period: float = 6.0) -> np.ndarray:
    """
    Напоминает о цикле вдоха-выдоха как основе жизни.
    Применяет пульсирующее размытие и яркость по ритму дыхания.
    """
    # Ease-in-out синусоида для плавного дыхания
    phase = 2 * np.pi * t / period
    breath = 0.5 + 0.3 * np.sin(phase)
    
    # Плавный ease-in-out
    breath = np.sin((phase + np.pi/2) / 2) * 0.6 + 0.5
    
    # Применяем размытие пропорционально дыханию
    blur_amount = int(breath * 2)
    if blur_amount > 0:
        blurred = cv2.GaussianBlur(frame, (0, 0), sigmaX=blur_amount, sigmaY=blur_amount)
        # Смешиваем с оригиналом
        result = cv2.addWeighted(frame, 1.0 - breath * 0.3, blurred, breath * 0.3, 0)
    else:
        result = frame
    
    # Пульсирующая яркость
    brightness = 1.0 + breath * 0.1
    result = np.clip(result * brightness, 0, 255).astype(np.uint8)
    
    return result


# ============================================================================
# ОСНОВНАЯ ФУНКЦИЯ ОБРАБОТКИ КАДРА
# ============================================================================

def process_frame(frame: np.ndarray, t: float) -> np.ndarray:
    """
    Применяет все эффекты к одному кадру.
    Порядок важен для визуального результата.
    """
    # 1. Цветовая трансформация (базовая палитра)
    frame = color_shift(frame, t)
    
    # 2. Усиление краёв (границы сознания)
    frame = edge_enhancement(frame, strength=0.15)
    
    # 3. Свечение (осознанное внимание)
    frame = glow_filter(frame, intensity=0.25)
    
    # 4. Ритм дыхания (жизненный цикл)
    frame = breath_rhythm(frame, t, period=6.0)
    
    # 5. Фотонный шум (квантовая неопределённость)
    frame = photonic_noise(frame, t, density=0.008)
    
    return frame


# ============================================================================
# ГЕНЕРАЦИЯ АУДИО
# ============================================================================

def generate_breath_audio(duration: float, fps: int = 44100) -> np.ndarray:
    """
    Генерирует низкий гул или heartbeat-loop для атмосферы.
    """
    t = np.linspace(0, duration, int(fps * duration))
    
    # Низкий гул (бас)
    bass = 0.1 * np.sin(2 * np.pi * 30 * t)
    
    # Heartbeat-ритм (пульсация каждые ~1.2 секунды)
    heartbeat = np.zeros_like(t)
    for i in range(int(duration / 1.2)):
        start = int(i * 1.2 * fps)
        end = int((i * 1.2 + 0.1) * fps)
        if end < len(heartbeat):
            heartbeat[start:end] = 0.05 * np.exp(-np.linspace(0, 10, end - start))
    
    # Дыхание (6-секундный цикл)
    breath = 0.05 * np.sin(2 * np.pi * t / 6.0)
    
    audio = bass + heartbeat + breath
    audio = audio / np.max(np.abs(audio)) * 0.3  # Нормализация
    
    return audio


# ============================================================================
# ГЛАВНАЯ ФУНКЦИЯ
# ============================================================================

def process_neuro_video(
    input_path: str,
    output_path: str = "neuro_processed.mp4",
    gif_path: Optional[str] = "neuro_teaser.gif",
    gif_duration: float = 5.0,
    fps: int = 24,
    add_audio: bool = True
) -> None:
    """
    Обрабатывает видео со всеми эффектами Neuro.
    """
    print(f"🎬 Загрузка видео: {input_path}")
    
    if not os.path.exists(input_path):
        print(f"❌ Файл не найден: {input_path}")
        return
    
    # Загружаем видео
    clip = VideoFileClip(input_path)
    original_duration = clip.duration
    
    print(f"📊 Исходное видео: {original_duration:.2f} сек, {clip.fps} fps, {clip.size}")
    
    # Применяем эффекты к каждому кадру
    print("✨ Применение эффектов...")
    processed_clip = clip.fl(lambda gf, t: process_frame(gf(t), t))
    
    # Добавляем fade-in/fade-out для плавности
    processed_clip = processed_clip.fx(fadein, 0.5)
    processed_clip = processed_clip.fx(fadeout, 1.0)
    
    # Генерируем аудио (если нужно)
    if add_audio and clip.audio is None:
        print("🔊 Генерация аудиофона...")
        from scipy.io import wavfile
        import tempfile
        
        audio_data = generate_breath_audio(processed_clip.duration)
        temp_audio = tempfile.NamedTemporaryFile(suffix='.wav', delete=False)
        wavfile.write(temp_audio.name, 44100, (audio_data * 32767).astype(np.int16))
        temp_audio.close()
        
        audio_clip = AudioFileClip(temp_audio.name)
        processed_clip = processed_clip.set_audio(audio_clip)
        
        # Удаляем временный файл после использования
        def cleanup():
            os.unlink(temp_audio.name)
            audio_clip.close()
        processed_clip = processed_clip.on_close(cleanup)
    
    # Экспортируем обработанное видео
    print(f"💾 Сохранение: {output_path}")
    processed_clip.write_videofile(
        output_path,
        fps=fps,
        codec='libx264',
        preset='slow',
        bitrate='5000k',
        audio_codec='aac',
        audio_bitrate='192k'
    )
    
    # Создаём GIF-тизер (первые N секунд)
    if gif_path:
        teaser_duration = min(gif_duration, processed_clip.duration)
        print(f"🎞️ Создание GIF-тизера ({teaser_duration:.1f} сек): {gif_path}")
        teaser = processed_clip.subclip(0, teaser_duration)
        teaser.write_gif(
            gif_path,
            fps=15,
            program='ffmpeg',
            opt='optimizeplus'
        )
        teaser.close()
    
    # Очистка
    processed_clip.close()
    clip.close()
    
    print("✅ Готово!")


# ============================================================================
# АЛЬТЕРНАТИВА: ОБРАБОТКА ИЗ СКРИНШОТОВ
# ============================================================================

def process_from_screenshots(
    screenshots_dir: str,
    output_path: str = "neuro_from_screenshots.mp4",
    fps: int = 2
) -> None:
    """
    Собирает видео из скриншотов в processed/ с применением эффектов.
    """
    screenshots_path = Path(screenshots_dir)
    if not screenshots_path.exists():
        print(f"❌ Папка не найдена: {screenshots_dir}")
        return
    
    # Находим все PNG файлы
    image_files = sorted(screenshots_path.glob("*.png"))
    if not image_files:
        print(f"❌ Изображения не найдены в {screenshots_dir}")
        return
    
    print(f"🖼️ Найдено {len(image_files)} изображений")
    
    # Загружаем и обрабатываем каждое изображение
    clips = []
    for i, img_path in enumerate(image_files):
        frame = np.array(Image.open(img_path).convert('RGB'))
        t = i / fps  # Время для эффектов
        processed_frame = process_frame(frame, t)
        
        # Создаём короткий клип из кадра
        img_clip = ImageSequenceClip([processed_frame], fps=fps)
        clips.append(img_clip)
    
    # Собираем в одно видео
    final_clip = concatenate_videoclips(clips, method="compose")
    
    # Добавляем fade
    final_clip = final_clip.fx(fadein, 0.5)
    final_clip = final_clip.fx(fadeout, 1.0)
    
    print(f"💾 Сохранение: {output_path}")
    final_clip.write_videofile(
        output_path,
        fps=fps,
        codec='libx264',
        preset='slow',
        bitrate='5000k'
    )
    
    final_clip.close()
    for clip in clips:
        clip.close()
    
    print("✅ Готово!")


# ============================================================================
# CLI
# ============================================================================

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Neuro Video Processor")
    parser.add_argument("input", nargs="?", default="Промт_для_презентации_Neuro.mp4",
                       help="Входной видеофайл")
    parser.add_argument("-o", "--output", default="neuro_processed.mp4",
                       help="Выходной видеофайл")
    parser.add_argument("-g", "--gif", default="neuro_teaser.gif",
                       help="Путь для GIF-тизера")
    parser.add_argument("--no-gif", action="store_true",
                       help="Не создавать GIF")
    parser.add_argument("--no-audio", action="store_true",
                       help="Не добавлять аудио")
    parser.add_argument("--from-screenshots", action="store_true",
                       help="Обработать из скриншотов в processed/")
    parser.add_argument("--screenshots-dir", default="processed",
                       help="Папка со скриншотами (если --from-screenshots)")
    
    args = parser.parse_args()
    
    if args.from_screenshots:
        process_from_screenshots(
            args.screenshots_dir,
            args.output
        )
    else:
        process_neuro_video(
            args.input,
            args.output,
            None if args.no_gif else args.gif,
            add_audio=not args.no_audio
        )

