#!/bin/bash

# Image processing script for Neuro presentation
# Resizes to 1920x1080, optimizes, and renames

TARGET_WIDTH=1920
TARGET_HEIGHT=1080
PROCESSED_DIR="processed"

cd "$(dirname "$0")"

# Formation names (7 formations)
FORMATIONS=(
    "01_Quantum_Cortex"
    "02_Hyperdimensional_Mesh"
    "03_Neural_Vortex"
    "04_Synaptic_Cloud"
    "05_Grid_Network"
    "06_Sphere_Formation"
    "07_ASCII_Neural_Network"
)

# Get all PNG files except ChatGPT and the tiny one, sorted by time
FILES=($(ls -1t *.png 2>/dev/null | grep -v "ChatGPT\|10.40.13" | head -20))

echo "Processing ${#FILES[@]} images..."

counter=0
formation_idx=0
frame_num=1

for file in "${FILES[@]}"; do
    if [ ! -f "$file" ]; then
        continue
    fi
    
    # Determine formation name (cycle through 7 formations)
    if [ $counter -lt 13 ]; then
        # First 13 images: distribute across 7 formations (2 per formation, roughly)
        formation_idx=$((counter / 2))
        frame_num=$((counter % 2 + 1))
    else
        # Remaining images: continue cycling
        formation_idx=$((counter % 7))
        frame_num=$((counter / 7 + 1))
    fi
    
    if [ $formation_idx -ge ${#FORMATIONS[@]} ]; then
        formation_idx=$((formation_idx % ${#FORMATIONS[@]}))
    fi
    
    formation_name="${FORMATIONS[$formation_idx]}"
    output_name="${formation_name}_frame${frame_num}.png"
    output_path="$PROCESSED_DIR/$output_name"
    
    echo "[$((counter + 1))/${#FILES[@]}] Processing: $file -> $output_name"
    
    # Resize to 1920x1080, maintaining aspect ratio, padding with black
    sips -z $TARGET_HEIGHT $TARGET_WIDTH "$file" --out "$output_path" 2>/dev/null || \
    sips --resampleHeightWidthMax $TARGET_HEIGHT "$file" --out "$output_path" 2>/dev/null
    
    # If image is not exactly 1920x1080, pad it
    current_size=$(sips -g pixelWidth -g pixelHeight "$output_path" 2>/dev/null | grep -E 'pixelWidth|pixelHeight' | awk '{print $2}' | tr '\n' ' ')
    width=$(echo $current_size | awk '{print $1}')
    height=$(echo $current_size | awk '{print $2}')
    
    if [ "$width" != "$TARGET_WIDTH" ] || [ "$height" != "$TARGET_HEIGHT" ]; then
        # Create temporary canvas and composite
        temp_canvas="/tmp/canvas_$$.png"
        sips -z $TARGET_HEIGHT $TARGET_WIDTH "$output_path" --out "$temp_canvas" 2>/dev/null || \
        sips --setProperty format png --setProperty formatOptions default "$output_path" --out "$temp_canvas" 2>/dev/null
        
        # Use sips to pad (create black background)
        sips --padToHeightWidth $TARGET_HEIGHT $TARGET_WIDTH --padColor FFFFFF "$output_path" --out "$temp_canvas" 2>/dev/null
        mv "$temp_canvas" "$output_path" 2>/dev/null || true
    fi
    
    # Optimize PNG (reduce file size while maintaining quality)
    # Using sips to re-encode with compression
    sips -s format png -s formatOptions 80 "$output_path" --out "$output_path" 2>/dev/null || true
    
    # Check file size
    size=$(stat -f%z "$output_path" 2>/dev/null || stat -c%s "$output_path" 2>/dev/null)
    size_mb=$(echo "scale=2; $size / 1024 / 1024" | bc 2>/dev/null || echo "?")
    echo "  ✓ Size: ${size_mb}MB"
    
    counter=$((counter + 1))
done

echo ""
echo "✅ Processing complete! Files saved to $PROCESSED_DIR/"
echo "Total files: $(ls -1 "$PROCESSED_DIR"/*.png 2>/dev/null | wc -l | tr -d ' ')"

