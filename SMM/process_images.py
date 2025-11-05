#!/usr/bin/env python3
"""
Process Neuro presentation images:
- Resize to 1920x1080 (maintain aspect ratio, pad with black)
- Optimize PNG compression
- Rename with formation names
"""

import os
import subprocess
import sys
from pathlib import Path

TARGET_WIDTH = 1920
TARGET_HEIGHT = 1080
PROCESSED_DIR = "processed"

FORMATIONS = [
    "01_Quantum_Cortex",
    "02_Hyperdimensional_Mesh",
    "03_Neural_Vortex",
    "04_Synaptic_Cloud",
    "05_Grid_Network",
    "06_Sphere_Formation",
    "07_ASCII_Neural_Network",
]

def get_image_size(image_path):
    """Get image dimensions using sips"""
    try:
        result = subprocess.run(
            ["sips", "-g", "pixelWidth", "-g", "pixelHeight", image_path],
            capture_output=True,
            text=True
        )
        width = None
        height = None
        for line in result.stdout.split('\n'):
            if 'pixelWidth' in line:
                width = int(line.split()[-1])
            elif 'pixelHeight' in line:
                height = int(line.split()[-1])
        return width, height
    except:
        return None, None

def process_image(input_path, output_path):
    """Process single image: resize, pad, optimize"""
    print(f"  Processing: {input_path.name}")
    
    # Get original size
    orig_w, orig_h = get_image_size(str(input_path))
    if not orig_w or not orig_h:
        print(f"    ⚠️  Could not read image size, skipping")
        return False
    
    print(f"    Original: {orig_w}x{orig_h}")
    
    # Calculate scaling to fit within 1920x1080
    scale_w = TARGET_WIDTH / orig_w
    scale_h = TARGET_HEIGHT / orig_h
    scale = min(scale_w, scale_h)
    
    new_w = int(orig_w * scale)
    new_h = int(orig_h * scale)
    
    # Resize first (maintain aspect ratio)
    temp_path = str(output_path).replace('.png', '_temp.png')
    try:
        subprocess.run(
            ["sips", "-z", str(new_h), str(new_w), str(input_path), "--out", temp_path],
            capture_output=True,
            check=True
        )
        
        # Pad to exact 1920x1080 with black background
        # Calculate padding
        pad_x = (TARGET_WIDTH - new_w) // 2
        pad_y = (TARGET_HEIGHT - new_h) // 2
        
        # Use sips to pad (create white/transparent background, then composite)
        # Actually, sips padToHeightWidth should work
        subprocess.run(
            ["sips", "--padToHeightWidth", str(TARGET_HEIGHT), str(TARGET_WIDTH), 
             "--padColor", "000000", temp_path, "--out", str(output_path)],
            capture_output=True,
            check=True
        )
        
        # Remove temp file
        if os.path.exists(temp_path):
            os.remove(temp_path)
        
        # Optimize: re-encode with compression
        subprocess.run(
            ["sips", "-s", "format", "png", "-s", "formatOptions", "80", 
             str(output_path), "--out", str(output_path)],
            capture_output=True,
            check=False  # Not critical
        )
        
        # Get final size
        final_size = os.path.getsize(output_path)
        final_mb = final_size / (1024 * 1024)
        final_w, final_h = get_image_size(str(output_path))
        
        print(f"    ✓ Final: {final_w}x{final_h}, {final_mb:.2f}MB")
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"    ⚠️  Error processing: {e}")
        if os.path.exists(temp_path):
            os.remove(temp_path)
        return False

def main():
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    # Create processed directory
    processed_path = Path(PROCESSED_DIR)
    processed_path.mkdir(exist_ok=True)
    
    # Get all PNG files (exclude ChatGPT and tiny one)
    all_files = sorted(Path('.').glob('Screenshot*.png'), key=lambda p: p.stat().st_mtime)
    files = [f for f in all_files if '10.40.13' not in f.name]
    
    print(f"Found {len(files)} images to process\n")
    
    counter = 0
    for i, file in enumerate(files):
        # Determine formation (cycle through 7)
        formation_idx = i % len(FORMATIONS)
        frame_num = (i // len(FORMATIONS)) + 1
        
        formation_name = FORMATIONS[formation_idx]
        output_name = f"{formation_name}_frame{frame_num:02d}.png"
        output_path = processed_path / output_name
        
        print(f"[{i+1}/{len(files)}] {output_name}")
        
        if process_image(file, output_path):
            counter += 1
        print()
    
    print(f"✅ Processing complete!")
    print(f"   Successfully processed: {counter}/{len(files)} images")
    print(f"   Output directory: {processed_path.absolute()}")

if __name__ == "__main__":
    main()

