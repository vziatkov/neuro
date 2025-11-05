#!/usr/bin/env python3
"""
Создание раскадровки (storyboard) из видео
Извлекает кадры и собирает их в один большой PNG-атлас
"""

import os
import subprocess
from pathlib import Path
from PIL import Image
import math

def extract_frames(video_path, output_dir, fps=1):
    """
    Извлекает кадры из видео
    fps - количество кадров в секунду для извлечения
    """
    output_dir = Path(output_dir)
    output_dir.mkdir(exist_ok=True)
    
    # Извлекаем кадры с заданной частотой
    output_pattern = str(output_dir / "frame_%04d.png")
    
    print(f"📹 Извлечение кадров из {video_path}...")
    result = subprocess.run(
        [
            'ffmpeg',
            '-i', video_path,
            '-vf', f'fps={fps}',
            '-y',
            output_pattern
        ],
        capture_output=True,
        check=True
    )
    
    # Находим все извлечённые кадры
    frames = sorted(output_dir.glob("frame_*.png"))
    print(f"✅ Извлечено {len(frames)} кадров")
    return frames

def create_storyboard_atlas(frames, output_path, cols=None, thumb_size=None):
    """
    Создаёт атлас из кадров
    frames - список путей к кадрам
    output_path - путь для сохранения атласа
    cols - количество колонок (автоматически если None)
    thumb_size - размер миниатюры (ширина, высота) или None для оригинального размера
    """
    if not frames:
        print("❌ Нет кадров для создания атласа")
        return
    
    print(f"🎨 Создание атласа из {len(frames)} кадров...")
    
    # Загружаем первый кадр для определения размера
    first_img = Image.open(frames[0])
    img_width, img_height = first_img.size
    
    # Если указан размер миниатюры, используем его
    if thumb_size:
        thumb_width, thumb_height = thumb_size
    else:
        thumb_width, thumb_height = img_width, img_height
    
    # Определяем количество колонок
    if cols is None:
        # Автоматически: квадратная сетка или немного шире
        cols = math.ceil(math.sqrt(len(frames)))
    
    rows = math.ceil(len(frames) / cols)
    
    # Создаём большой canvas
    atlas_width = cols * thumb_width
    atlas_height = rows * thumb_height
    atlas = Image.new('RGB', (atlas_width, atlas_height), color=(0, 0, 0))
    
    print(f"📐 Атлас: {atlas_width}x{atlas_height}px, сетка: {cols}x{rows}")
    
    # Размещаем кадры
    for idx, frame_path in enumerate(frames):
        row = idx // cols
        col = idx % cols
        
        try:
            img = Image.open(frame_path)
            
            # Ресайзим если нужно
            if thumb_size:
                img = img.resize((thumb_width, thumb_height), Image.Resampling.LANCZOS)
            
            # Вычисляем позицию
            x = col * thumb_width
            y = row * thumb_height
            
            # Вставляем кадр
            atlas.paste(img, (x, y))
            
        except Exception as e:
            print(f"⚠️ Ошибка при обработке {frame_path}: {e}")
    
    # Сохраняем атлас
    atlas.save(output_path, 'PNG', optimize=True, compress_level=9)
    file_size = os.path.getsize(output_path) / (1024 * 1024)
    print(f"✅ Атлас сохранён: {output_path} ({file_size:.2f}MB)")
    
    return atlas

def add_labels_to_atlas(atlas_path, frames, cols, thumb_width, thumb_height):
    """
    Добавляет подписи с временными метками к кадрам
    """
    from PIL import ImageDraw, ImageFont
    
    try:
        atlas = Image.open(atlas_path)
        draw = ImageDraw.Draw(atlas)
        
        # Пробуем загрузить шрифт
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 20)
        except:
            font = ImageFont.load_default()
        
        rows = math.ceil(len(frames) / cols)
        
        # Добавляем временные метки
        for idx, frame_path in enumerate(frames):
            row = idx // cols
            col = idx % cols
            
            # Вычисляем время (предполагаем 1 кадр в секунду)
            time_sec = idx
            time_str = f"{time_sec:02d}s"
            
            x = col * thumb_width + 10
            y = row * thumb_height + 10
            
            # Рисуем фон для текста
            bbox = draw.textbbox((x, y), time_str, font=font)
            draw.rectangle(bbox, fill=(0, 0, 0, 200))
            
            # Рисуем текст
            draw.text((x, y), time_str, fill=(255, 255, 255), font=font)
        
        atlas.save(atlas_path, 'PNG', optimize=True)
        print(f"✅ Добавлены временные метки")
        
    except Exception as e:
        print(f"⚠️ Не удалось добавить метки: {e}")

def main():
    """Основная функция"""
    import argparse
    
    parser = argparse.ArgumentParser(description="Создание раскадровки из видео")
    parser.add_argument("video", nargs="?", default="neuro_processed_10s.mp4",
                       help="Входное видео")
    parser.add_argument("-o", "--output", default="storyboard/storyboard_atlas.png",
                       help="Выходной PNG-атлас")
    parser.add_argument("-d", "--dir", default="storyboard",
                       help="Папка для временных кадров")
    parser.add_argument("-fps", type=float, default=1.0,
                       help="Частота извлечения кадров (кадров в секунду)")
    parser.add_argument("-c", "--cols", type=int, default=None,
                       help="Количество колонок (автоматически если не указано)")
    parser.add_argument("-s", "--size", type=int, nargs=2, default=None,
                       help="Размер миниатюры: width height (оригинальный размер если не указано)")
    parser.add_argument("--labels", action="store_true",
                       help="Добавить временные метки к кадрам")
    
    args = parser.parse_args()
    
    video_path = Path(args.video)
    if not video_path.exists():
        print(f"❌ Видео не найдено: {video_path}")
        return
    
    # Извлекаем кадры
    frames = extract_frames(str(video_path), args.dir, fps=args.fps)
    
    if not frames:
        print("❌ Не удалось извлечь кадры")
        return
    
    # Определяем размер миниатюр
    thumb_size = tuple(args.size) if args.size else None
    
    # Создаём атлас
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    atlas = create_storyboard_atlas(
        frames, 
        str(output_path),
        cols=args.cols,
        thumb_size=thumb_size
    )
    
    # Добавляем метки если нужно
    if args.labels and atlas:
        first_img = Image.open(frames[0])
        img_width, img_height = first_img.size
        thumb_width = thumb_size[0] if thumb_size else img_width
        thumb_height = thumb_size[1] if thumb_size else img_height
        cols = args.cols or math.ceil(math.sqrt(len(frames)))
        
        add_labels_to_atlas(
            str(output_path),
            frames,
            cols,
            thumb_width,
            thumb_height
        )
    
    print(f"\n✅ Раскадровка готова: {output_path}")
    print(f"📁 Кадры сохранены в: {args.dir}/")

if __name__ == "__main__":
    main()

