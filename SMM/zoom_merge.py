#!/usr/bin/env python3
"""
Простой скрипт для объединения двух видео с эффектом zoom in/out
"""

import sys
import numpy as np
import cv2
from moviepy.editor import VideoFileClip, CompositeVideoClip, concatenate_videoclips, ColorClip
from moviepy.video.fx.all import fadein, fadeout

def zoom_effect(clip, zoom_in=1.3, zoom_out=1.0):
    """Применяет плавный zoom in → zoom out"""
    duration = clip.duration
    w, h = clip.size
    
    def transform_frame(get_frame, t):
        # Первая половина: zoom in (1.0 → zoom_in)
        # Вторая половина: zoom out (zoom_in → zoom_out)
        if t < duration / 2:
            progress = t / (duration / 2)
            # Плавная кривая ease-in-out
            progress = progress * progress * (3 - 2 * progress)
            scale = 1.0 + (zoom_in - 1.0) * progress
        else:
            progress = (t - duration / 2) / (duration / 2)
            progress = progress * progress * (3 - 2 * progress)
            scale = zoom_in - (zoom_in - zoom_out) * progress
        
        # Получаем кадр
        frame = get_frame(t)
        
        # Масштабируем через cv2
        new_w = int(w * scale)
        new_h = int(h * scale)
        zoomed = cv2.resize(frame, (new_w, new_h), interpolation=cv2.INTER_LINEAR)
        
        # Обрезаем/добавляем границы до исходного размера (центрируем)
        if scale > 1.0:
            y1 = (zoomed.shape[0] - h) // 2
            x1 = (zoomed.shape[1] - w) // 2
            zoomed = zoomed[y1:y1+h, x1:x1+w]
        else:
            # Если уменьшаем, добавляем черные границы
            pad_y = (h - zoomed.shape[0]) // 2
            pad_x = (w - zoomed.shape[1]) // 2
            zoomed = cv2.copyMakeBorder(zoomed, pad_y, h-zoomed.shape[0]-pad_y,
                                       pad_x, w-zoomed.shape[1]-pad_x,
                                       cv2.BORDER_CONSTANT, value=[0,0,0])
        
        return zoomed
    
    return clip.fl(transform_frame)

def create_eye_mask(h, w, progress, closing=True):
    """Создает маску в форме закрывающегося/открывающегося глаза"""
    center_y, center_x = h // 2, w // 2
    y_coords, x_coords = np.ogrid[:h, :w]
    
    # Форма глаза: эллиптическая, закрывается сверху и снизу
    # Горизонтальный радиус (ширина глаза)
    rx = w * 0.5
    
    # Вертикальная щель между веками (уменьшается при закрытии)
    # При progress=0 глаз открыт, при progress=1 полностью закрыт
    if closing:
        max_gap = h * 0.6  # Максимальная щель (открытый глаз)
        gap = max_gap * (1 - progress)  # Щель уменьшается
    else:
        max_gap = h * 0.6
        gap = max_gap * (1 - progress)  # Щель увеличивается при открытии
    
    # Расстояние от центра по вертикали
    dist_y = np.abs(y_coords - center_y)
    
    # Форма век: эллиптическая кривая (веки более закрыты по краям)
    # Расстояние от центра по горизонтали
    dist_x = np.abs(x_coords - center_x)
    # Эллиптическая форма: в центре больше щель, по краям меньше
    ellipse_factor = np.sqrt(1 - np.clip((dist_x / rx) ** 2, 0, 1))
    # Применяем эллиптическую форму к щели
    effective_gap = gap * (0.3 + 0.7 * ellipse_factor)  # 30-100% от gap
    
    # Видимость: чем ближе к центру по Y и чем больше effective_gap, тем больше видимость
    visibility = np.clip(1 - np.maximum(0, dist_y - effective_gap) / (effective_gap * 0.5 + 1), 0, 1)
    
    # Плавный переход (smoothstep для мягких краев)
    visibility = visibility ** 2 * (3 - 2 * visibility)
    
    return visibility

def blink_close_effect(clip, blink_duration=0.15):
    """Моргание: закрытие глаза в конце клипа с формой век"""
    def make_frame(get_frame, t):
        frame = get_frame(t)
        duration = clip.duration
        h, w = frame.shape[:2]
        
        if t > duration - blink_duration:
            blink_progress = (t - (duration - blink_duration)) / blink_duration
            # Плавное закрытие (ease-in)
            blink_progress = blink_progress * blink_progress
            
            # Создаем маску в форме глаза
            mask = create_eye_mask(h, w, blink_progress, closing=True)
            
            # Применяем маску к каждому каналу
            frame = frame.astype(np.float32)
            for c in range(3):
                frame[:, :, c] = frame[:, :, c] * mask
            frame = np.clip(frame, 0, 255).astype(np.uint8)
        
        return frame
    
    return clip.fl(make_frame)

def blink_open_effect(clip, blink_duration=0.15):
    """Моргание: открытие глаза в начале клипа с формой век"""
    def make_frame(get_frame, t):
        frame = get_frame(t)
        h, w = frame.shape[:2]
        
        if t < blink_duration:
            blink_progress = t / blink_duration
            # Плавное открытие (ease-out)
            blink_progress = 1 - (1 - blink_progress) * (1 - blink_progress)
            
            # Инвертируем для открытия (начинаем с закрытого)
            progress = 1 - blink_progress
            
            # Создаем маску в форме глаза
            mask = create_eye_mask(h, w, progress, closing=False)
            
            # Применяем маску к каждому каналу
            frame = frame.astype(np.float32)
            for c in range(3):
                frame[:, :, c] = frame[:, :, c] * mask
            frame = np.clip(frame, 0, 255).astype(np.uint8)
        
        return frame
    
    return clip.fl(make_frame)

def main():
    video1 = "Промт_для_презентации_Neuro.mp4"
    video2 = "ezgif-68cfdb24be61ad.mp4"
    output = "neuro_zoom_merged.mp4"
    
    print(f"🎬 Загрузка: {video1}")
    clip1 = VideoFileClip(video1)
    
    print(f"🎬 Загрузка: {video2}")
    clip2 = VideoFileClip(video2)
    
    print("🔍 Применение zoom эффектов...")
    # Применяем zoom к каждому клипу
    zoomed1 = zoom_effect(clip1, zoom_in=1.3, zoom_out=1.0)
    zoomed2 = zoom_effect(clip2, zoom_in=1.3, zoom_out=1.0)
    
    # Эффект моргания вместо обычного fade
    print("👁️ Добавление эффекта моргания...")
    zoomed1 = blink_open_effect(zoomed1, blink_duration=0.2)   # Открытие в начале
    zoomed1 = blink_close_effect(zoomed1, blink_duration=0.2)  # Закрытие в конце
    zoomed2 = blink_open_effect(zoomed2, blink_duration=0.2)   # Открытие в начале
    
    print("🔗 Объединение...")
    final = concatenate_videoclips([zoomed1, zoomed2], method="compose")
    
    print(f"💾 Сохранение: {output}")
    final.write_videofile(
        output,
        fps=24,
        codec='libx264',
        preset='medium',
        bitrate='5000k'
    )
    
    # Очистка
    final.close()
    zoomed1.close()
    zoomed2.close()
    clip1.close()
    clip2.close()
    
    print("✅ Готово!")

if __name__ == "__main__":
    main()

