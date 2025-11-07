#!/usr/bin/env python3
"""
Конвертация видео в анимированный WebP и AVIF
Создает красивые анимированные изображения с хорошим сжатием
"""

import os
import sys
import subprocess
import tempfile
import shutil
from pathlib import Path

def check_dependencies():
    """Проверяет наличие необходимых инструментов"""
    missing = []
    
    # Проверяем ffmpeg
    if not shutil.which('ffmpeg'):
        missing.append('ffmpeg')
    
    # Проверяем cwebp (для WebP)
    if not shutil.which('cwebp'):
        missing.append('cwebp (libwebp)')
    
    # Проверяем avifenc (для AVIF) - опционально
    has_avifenc = shutil.which('avifenc')
    
    if missing:
        print(f"❌ Отсутствуют зависимости: {', '.join(missing)}")
        print("\nУстановка:")
        print("  macOS: brew install ffmpeg webp libavif")
        print("  Ubuntu: sudo apt install ffmpeg webp libavif-bin")
        return False, has_avifenc
    
    return True, has_avifenc

def extract_frames(video_path, output_dir, fps=24, quality=100):
    """Извлекает кадры из видео"""
    print(f"🎬 Извлечение кадров из {video_path}...")
    
    # Создаем папку для кадров
    os.makedirs(output_dir, exist_ok=True)
    
    # Извлекаем кадры через ffmpeg
    frame_pattern = os.path.join(output_dir, "frame_%05d.png")
    
    cmd = [
        'ffmpeg', '-i', video_path,
        '-vf', f'fps={fps}',
        '-q:v', str(quality),  # Качество для PNG (2 = лучшее)
        '-y', frame_pattern
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode != 0:
        print(f"❌ Ошибка извлечения кадров: {result.stderr}")
        return False
    
    # Подсчитываем количество кадров
    frames = sorted(Path(output_dir).glob("frame_*.png"))
    print(f"✅ Извлечено {len(frames)} кадров")
    
    return len(frames) > 0

def create_animated_webp(frames_dir, output_path, fps=24, quality=90, lossless=False):
    """Создает анимированный WebP"""
    print(f"🎨 Создание анимированного WebP: {output_path}")
    
    frames = sorted(Path(frames_dir).glob("frame_*.png"))
    if not frames:
        print("❌ Кадры не найдены")
        return False
    
    # Используем img2webp для создания анимированного WebP
    cmd = ['img2webp']
    
    if lossless:
        cmd.extend(['-lossless'])
    else:
        cmd.extend(['-q', str(quality)])
    
    # Задержка между кадрами (в миллисекундах)
    delay = int(1000 / fps)
    cmd.extend(['-d', str(delay)])
    
    # Режим зацикливания
    cmd.extend(['-loop', '0'])
    
    # Добавляем все кадры
    for frame in frames:
        cmd.append(str(frame))
    
    # Выходной файл
    cmd.extend(['-o', output_path])
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode != 0:
        print(f"❌ Ошибка создания WebP: {result.stderr}")
        return False
    
    file_size = os.path.getsize(output_path) / (1024 * 1024)  # MB
    print(f"✅ WebP создан: {file_size:.2f} MB")
    
    return True

def create_animated_avif_ffmpeg(video_path, output_path, quality=50, lossless=False):
    """Создает анимированный AVIF через ffmpeg"""
    print(f"🎨 Создание анимированного AVIF: {output_path}")
    
    cmd = ['ffmpeg', '-i', video_path]
    
    if lossless:
        # Без потерь через AV1
        cmd.extend([
            '-c:v', 'libaom-av1',
            '-crf', '0',
            '-b:v', '0',
            '-pix_fmt', 'yuv420p'
        ])
    else:
        # С потерями, но высокое качество
        cmd.extend([
            '-c:v', 'libaom-av1',
            '-crf', str(quality),  # 0-63, меньше = лучше качество
            '-b:v', '0',
            '-pix_fmt', 'yuv420p'
        ])
    
    cmd.extend(['-y', output_path])
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode != 0:
        print(f"❌ Ошибка создания AVIF: {result.stderr}")
        print("💡 Убедитесь, что ffmpeg скомпилирован с поддержкой libaom-av1")
        return False
    
    file_size = os.path.getsize(output_path) / (1024 * 1024)  # MB
    print(f"✅ AVIF создан: {file_size:.2f} MB")
    
    return True

def create_avif_sequence(frames_dir, output_dir, quality=50, lossless=False):
    """Создает последовательность AVIF кадров"""
    print(f"🎨 Создание последовательности AVIF кадров...")
    
    frames = sorted(Path(frames_dir).glob("frame_*.png"))
    if not frames:
        print("❌ Кадры не найдены")
        return False
    
    os.makedirs(output_dir, exist_ok=True)
    
    # Используем avifenc если доступен, иначе ffmpeg
    if shutil.which('avifenc'):
        for i, frame in enumerate(frames):
            output_frame = os.path.join(output_dir, f"frame_{i:05d}.avif")
            cmd = ['avifenc']
            
            if lossless:
                cmd.extend(['-l'])
            else:
                cmd.extend(['-q', str(quality)])
            
            cmd.extend([str(frame), output_frame])
            subprocess.run(cmd, capture_output=True)
    else:
        # Используем ffmpeg для каждого кадра
        for i, frame in enumerate(frames):
            output_frame = os.path.join(output_dir, f"frame_{i:05d}.avif")
            cmd = [
                'ffmpeg', '-i', str(frame),
                '-c:v', 'libaom-av1',
                '-crf', '0' if lossless else str(quality),
                '-y', output_frame
            ]
            subprocess.run(cmd, capture_output=True)
    
    print(f"✅ Создано {len(frames)} AVIF кадров")
    return True

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description="Конвертация видео в WebP и AVIF")
    parser.add_argument("input", nargs="?", default="neuro_zoom_merged.mp4",
                       help="Входное видео")
    parser.add_argument("--webp", default="neuro_zoom_merged.webp",
                       help="Выходной WebP файл")
    parser.add_argument("--avif", default="neuro_zoom_merged.avif",
                       help="Выходной AVIF файл")
    parser.add_argument("--fps", type=int, default=24,
                       help="FPS для анимации (по умолчанию: 24)")
    parser.add_argument("--webp-quality", type=int, default=90,
                       help="Качество WebP 0-100 (по умолчанию: 90)")
    parser.add_argument("--avif-quality", type=int, default=30,
                       help="Качество AVIF 0-63, меньше=лучше (по умолчанию: 30)")
    parser.add_argument("--lossless", action="store_true",
                       help="Без потерь (для обоих форматов)")
    parser.add_argument("--keep-frames", action="store_true",
                       help="Не удалять временные кадры")
    
    args = parser.parse_args()
    
    # Проверяем зависимости
    has_deps, has_avifenc = check_dependencies()
    if not has_deps:
        sys.exit(1)
    
    # Проверяем входной файл
    if not os.path.exists(args.input):
        print(f"❌ Файл не найден: {args.input}")
        sys.exit(1)
    
    # Создаем временную папку для кадров
    temp_dir = tempfile.mkdtemp(prefix="frames_")
    
    try:
        # Извлекаем кадры
        if not extract_frames(args.input, temp_dir, fps=args.fps):
            sys.exit(1)
        
        # Создаем WebP
        if not create_animated_webp(
            temp_dir, args.webp, 
            fps=args.fps, 
            quality=args.webp_quality,
            lossless=args.lossless
        ):
            print("⚠️ Не удалось создать WebP, продолжаем...")
        
        # Создаем AVIF
        # Пробуем сначала через ffmpeg (анимированный)
        if not create_animated_avif_ffmpeg(
            args.input, args.avif,
            quality=args.avif_quality,
            lossless=args.lossless
        ):
            print("⚠️ Не удалось создать анимированный AVIF")
            print("💡 Создаю последовательность AVIF кадров...")
            avif_dir = args.avif.replace('.avif', '_frames')
            create_avif_sequence(temp_dir, avif_dir, 
                                quality=args.avif_quality,
                                lossless=args.lossless)
        
        print("\n✅ Конвертация завершена!")
        print(f"📁 WebP: {args.webp}")
        print(f"📁 AVIF: {args.avif}")
        
    finally:
        # Удаляем временные файлы
        if not args.keep_frames:
            shutil.rmtree(temp_dir, ignore_errors=True)
        else:
            print(f"📁 Временные кадры сохранены в: {temp_dir}")

if __name__ == "__main__":
    main()

