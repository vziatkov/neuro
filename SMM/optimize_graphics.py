#!/usr/bin/env python3
"""
Оптимизация графических файлов
Оптимизирует PNG, GIF, JPG и MP4 без потери качества
"""

import os
import subprocess
from pathlib import Path
from PIL import Image
import sys

def optimize_png(input_path, output_path=None):
    """Оптимизация PNG с сохранением качества"""
    input_str = str(input_path)
    if output_path is None:
        output_path = input_str
    
    try:
        img = Image.open(input_str)
        # Конвертируем в RGB если нужно
        if img.mode in ('RGBA', 'LA', 'P'):
            # Сохраняем альфа-канал если есть
            if img.mode == 'RGBA':
                img.save(output_path, 'PNG', optimize=True, compress_level=9)
            else:
                img = img.convert('RGB')
                img.save(output_path, 'PNG', optimize=True, compress_level=9)
        else:
            img.save(output_path, 'PNG', optimize=True, compress_level=9)
        
        orig_size = os.path.getsize(input_str)
        new_size = os.path.getsize(output_path)
        saved = orig_size - new_size
        if saved > 0:
            print(f"  ✅ PNG: {saved/1024:.1f}KB сохранено ({orig_size/1024:.1f}KB → {new_size/1024:.1f}KB)")
            if output_path != input_str:
                os.replace(output_path, input_str)
            return True
        else:
            # Если не получилось сжать, оставляем оригинал
            if output_path != input_str:
                if os.path.exists(output_path):
                    os.remove(output_path)
            return False
    except Exception as e:
        print(f"  ❌ Ошибка PNG: {e}")
        return False

def optimize_gif(input_path, output_path=None):
    """Оптимизация GIF через gifsicle или ffmpeg"""
    input_str = str(input_path)
    if output_path is None:
        output_path = input_str.replace('.gif', '_optimized.gif')
    
    orig_size = os.path.getsize(input_path)
    
    # Пробуем gifsicle (если установлен)
    try:
        result = subprocess.run(
            ['gifsicle', '-O3', '--lossy=30', '--colors=256', '-i', input_str, '-o', output_path],
            capture_output=True,
            check=True
        )
        new_size = os.path.getsize(output_path)
        saved = orig_size - new_size
        if saved > 0:
            print(f"  ✅ GIF (gifsicle): {saved/1024/1024:.2f}MB сохранено ({orig_size/1024/1024:.2f}MB → {new_size/1024/1024:.2f}MB)")
            if output_path != input_str:
                os.replace(output_path, input_str)
            return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        pass
    
    # Fallback: ffmpeg с оптимизацией
    try:
        result = subprocess.run(
            ['ffmpeg', '-i', input_str, '-vf', 'fps=15,scale=640:-1:flags=lanczos', '-y', output_path],
            capture_output=True,
            check=True
        )
        new_size = os.path.getsize(output_path)
        saved = orig_size - new_size
        if saved > 0:
            print(f"  ✅ GIF (ffmpeg): {saved/1024/1024:.2f}MB сохранено ({orig_size/1024/1024:.2f}MB → {new_size/1024/1024:.2f}MB)")
            if output_path != input_str:
                os.replace(output_path, input_str)
            return True
    except Exception as e:
        print(f"  ❌ Ошибка GIF: {e}")
    
    return False

def optimize_mp4(input_path, output_path=None):
    """Оптимизация MP4 с сохранением качества"""
    input_str = str(input_path)
    if output_path is None:
        output_path = input_str.replace('.mp4', '_optimized.mp4')
    
    orig_size = os.path.getsize(input_path)
    
    try:
        # Используем двухпроходное кодирование с оптимизацией
        result = subprocess.run(
            [
                'ffmpeg', '-i', input_str,
                '-c:v', 'libx264',
                '-preset', 'veryslow',
                '-crf', '23',  # Немного выше для меньшего размера, но качество хорошее
                '-c:a', 'aac',
                '-b:a', '128k',
                '-movflags', '+faststart',
                '-y', output_path
            ],
            capture_output=True,
            check=True
        )
        
        new_size = os.path.getsize(output_path)
        saved = orig_size - new_size
        if saved > 0:
            print(f"  ✅ MP4: {saved/1024/1024:.2f}MB сохранено ({orig_size/1024/1024:.2f}MB → {new_size/1024/1024:.2f}MB)")
            if output_path != input_str:
                os.replace(output_path, input_str)
            return True
        else:
            if output_path != input_str and os.path.exists(output_path):
                os.remove(output_path)
            return False
    except Exception as e:
        print(f"  ❌ Ошибка MP4: {e}")
        if output_path != input_str and os.path.exists(output_path):
            os.remove(output_path)
        return False

def optimize_jpg(input_path, output_path=None):
    """Оптимизация JPEG"""
    input_str = str(input_path)
    if output_path is None:
        output_path = input_str
    
    try:
        img = Image.open(input_str)
        # Сохраняем с оптимизацией
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        img.save(output_path, 'JPEG', quality=85, optimize=True)
        
        orig_size = os.path.getsize(input_str)
        new_size = os.path.getsize(output_path)
        saved = orig_size - new_size
        if saved > 0:
            print(f"  ✅ JPG: {saved/1024:.1f}KB сохранено ({orig_size/1024:.1f}KB → {new_size/1024:.1f}KB)")
            if output_path != input_str:
                os.replace(output_path, input_str)
            return True
        else:
            if output_path != input_str:
                if os.path.exists(output_path):
                    os.remove(output_path)
            return False
    except Exception as e:
        print(f"  ❌ Ошибка JPG: {e}")
        return False

def main():
    """Основная функция"""
    import argparse
    
    parser = argparse.ArgumentParser(description="Оптимизация графических файлов")
    parser.add_argument("path", nargs="?", default=".", help="Путь к файлам/папке")
    parser.add_argument("--recursive", "-r", action="store_true", help="Рекурсивно обрабатывать папки")
    
    args = parser.parse_args()
    
    path = Path(args.path)
    
    # Находим все графические файлы
    patterns = ['*.png', '*.gif', '*.jpg', '*.jpeg', '*.mp4']
    files = []
    
    if path.is_file():
        files = [path]
    elif path.is_dir():
        for pattern in patterns:
            if args.recursive:
                files.extend(path.rglob(pattern))
            else:
                files.extend(path.glob(pattern))
    
    if not files:
        print("❌ Файлы не найдены")
        return
    
    # Исключаем уже оптимизированные
    files = [f for f in files if not str(f).endswith('_optimized.gif') and not str(f).endswith('_optimized.mp4')]
    
    print(f"🎨 Найдено {len(files)} файлов для оптимизации\n")
    
    total_saved = 0
    optimized = 0
    
    for file_path in sorted(files):
        print(f"📄 {file_path.name}")
        
        orig_size = os.path.getsize(file_path)
        
        if file_path.suffix.lower() == '.png':
            if optimize_png(file_path):
                optimized += 1
                new_size = os.path.getsize(file_path)
                total_saved += orig_size - new_size
        elif file_path.suffix.lower() == '.gif':
            if optimize_gif(file_path):
                optimized += 1
                new_size = os.path.getsize(file_path)
                total_saved += orig_size - new_size
        elif file_path.suffix.lower() == '.mp4':
            if optimize_mp4(file_path):
                optimized += 1
                new_size = os.path.getsize(file_path)
                total_saved += orig_size - new_size
        elif file_path.suffix.lower() in ('.jpg', '.jpeg'):
            if optimize_jpg(file_path):
                optimized += 1
                new_size = os.path.getsize(file_path)
                total_saved += orig_size - new_size
        else:
            print(f"  ⏭️  Пропущен (неподдерживаемый формат)")
    
    print(f"\n✅ Готово! Оптимизировано {optimized}/{len(files)} файлов")
    if total_saved > 0:
        print(f"💾 Всего сохранено: {total_saved/1024/1024:.2f}MB")

if __name__ == "__main__":
    main()

