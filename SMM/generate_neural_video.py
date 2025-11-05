#!/usr/bin/env python3
"""
Генерация видео нейронной сети на основе промта
Использует Three.js через headless browser для рендеринга
"""

import os
import sys
import subprocess
import json
from pathlib import Path

# Проверяем наличие node.js и puppeteer
def check_dependencies():
    """Проверка зависимостей"""
    try:
        subprocess.run(['node', '--version'], capture_output=True, check=True)
        print("✅ Node.js установлен")
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("❌ Node.js не найден. Установите Node.js для работы скрипта.")
        return False
    
    return True

def create_threejs_script(output_path="neuro_generated.mp4", duration=10):
    """Создаёт HTML-файл с Three.js анимацией на основе промта"""
    
    html_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Neuro Network Visualization</title>
    <style>
        body { margin: 0; overflow: hidden; background: #000; }
        canvas { display: block; }
    </style>
</head>
<body>
    <canvas id="canvas"></canvas>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script>
        // Настройки сцены
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1920/1080, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas: document.getElementById('canvas'),
            antialias: true,
            alpha: true
        });
        renderer.setSize(1920, 1080);
        renderer.setPixelRatio(window.devicePixelRatio);
        
        // Цветовая палитра из промта
        const colors = {
            purple: new THREE.Color(0x8b5cf6),
            blue: new THREE.Color(0x3b82f6),
            turquoise: new THREE.Color(0x4fd1c5)
        };
        
        // Создание нейронной сети
        const nodes = [];
        const connections = [];
        const numNodes = 500;
        const radius = 15;
        
        // Генерация узлов в форме цветка/спирали
        for (let i = 0; i < numNodes; i++) {
            const angle = (i / numNodes) * Math.PI * 4;
            const spiralRadius = (i / numNodes) * 8;
            const height = Math.sin(angle * 2) * 3;
            
            const x = Math.cos(angle) * spiralRadius;
            const y = height;
            const z = Math.sin(angle) * spiralRadius;
            
            // Создание узла
            const geometry = new THREE.SphereGeometry(0.15, 8, 8);
            const material = new THREE.MeshBasicMaterial({ 
                color: colors.purple,
                emissive: colors.purple,
                emissiveIntensity: 0.8
            });
            const node = new THREE.Mesh(geometry, material);
            node.position.set(x, y, z);
            scene.add(node);
            nodes.push({ mesh: node, basePos: { x, y, z }, color: colors.purple });
        }
        
        // Создание связей между узлами
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dist = nodes[i].mesh.position.distanceTo(nodes[j].mesh.position);
                if (dist < 2.5) {
                    const geometry = new THREE.BufferGeometry().setFromPoints([
                        nodes[i].mesh.position,
                        nodes[j].mesh.position
                    ]);
                    const material = new THREE.LineBasicMaterial({ 
                        color: colors.blue,
                        opacity: 0.3,
                        transparent: true
                    });
                    const line = new THREE.Line(geometry, material);
                    scene.add(line);
                    connections.push(line);
                }
            }
        }
        
        // Камера - медленное вращение
        camera.position.set(0, 5, 25);
        camera.lookAt(0, 0, 0);
        
        // Анимация
        let time = 0;
        const clock = new THREE.Clock();
        
        function animate() {
            time += 0.016; // ~60fps
            
            // Дыхание - расширение и сжатие
            const breath = 1 + Math.sin(time * 0.5) * 0.2;
            
            // Обновление узлов
            nodes.forEach((node, i) => {
                const angle = (i / numNodes) * Math.PI * 4 + time * 0.1;
                const spiralRadius = (i / numNodes) * 8 * breath;
                const height = Math.sin(angle * 2) * 3;
                
                const x = Math.cos(angle) * spiralRadius;
                const y = height;
                const z = Math.sin(angle) * spiralRadius;
                
                node.mesh.position.set(x, y, z);
                
                // Мерцание цветов
                const colorPhase = (i / numNodes + time * 0.3) % 1;
                if (colorPhase < 0.33) {
                    node.mesh.material.color = colors.purple;
                    node.mesh.material.emissive = colors.purple;
                } else if (colorPhase < 0.66) {
                    node.mesh.material.color = colors.blue;
                    node.mesh.material.emissive = colors.blue;
                } else {
                    node.mesh.material.color = colors.turquoise;
                    node.mesh.material.emissive = colors.turquoise;
                }
            });
            
            // Обновление связей
            connections.forEach(conn => {
                conn.geometry.setFromPoints([conn.geometry.attributes.position.array]);
            });
            
            // Вращение камеры
            const angle = time * 0.1;
            camera.position.x = Math.cos(angle) * 25;
            camera.position.z = Math.sin(angle) * 25;
            camera.lookAt(0, 0, 0);
            
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        
        animate();
    </script>
</body>
</html>'''
    
    output_file = Path("neuro_generation.html")
    output_file.write_text(html_content, encoding='utf-8')
    print(f"✅ HTML-файл создан: {output_file}")
    return output_file

def generate_video_with_ffmpeg():
    """Альтернативный метод: использование ffmpeg для создания видео из кадров"""
    print("📹 Для генерации видео через Three.js потребуется:")
    print("   1. Установить Puppeteer: npm install puppeteer")
    print("   2. Запустить headless Chrome для рендеринга кадров")
    print("   3. Использовать ffmpeg для сборки видео из кадров")
    print("\n💡 Рекомендация: Используйте промт из VEO_PROMPT.md с генеративными сервисами")
    print("   (Veo, Runway, Pika Labs) для более качественного результата.")

def main():
    """Основная функция"""
    print("🎬 Генератор видео нейронной сети\n")
    
    if not check_dependencies():
        generate_video_with_ffmpeg()
        return
    
    # Создаём HTML-файл для визуализации
    html_file = create_threejs_script()
    
    print(f"\n📄 HTML-файл готов: {html_file}")
    print("💡 Откройте его в браузере для предварительного просмотра")
    print("📝 Для записи видео используйте:")
    print("   - OBS Studio (экранная запись)")
    print("   - Puppeteer + ffmpeg (автоматизация)")
    print("   - Или промт из VEO_PROMPT.md с генеративными сервисами")

if __name__ == "__main__":
    main()

