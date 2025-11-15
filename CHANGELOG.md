# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Clustering module** (`src/modules/clustering.ts`) with cosine distance and HDBSCAN-like algorithm
  - Кластеризация на основе косинусного расстояния и алгоритма, подобного HDBSCAN
- **Swarm impulse system** (`src/modules/swarmImpulse.ts`) with trust-weighted graph propagation
  - Система импульсов роя с распространением по графу с весами доверия
- **Emotional core** (`src/modules/emotional-core.ts`) for logging emotional telemetry
  - Эмоциональное ядро для логирования эмоциональной телеметрии
- **Demo page** (`demo-clustering.html`) for interactive testing of clustering, swarm impulses, and emotional core
  - Демо-страница для интерактивного тестирования кластеризации, импульсов роя и эмоционального ядра
- **Bilingual documentation** (English/Russian) for demo and testing instructions
  - Двуязычная документация (английский/русский) для демо и инструкций по тестированию
- **Modern clustering metrics guide** (`docs/modern-clustering-metrics.md`)
  - Руководство по современным метрикам кластеризации
- **Functional Data Analysis guide** (`docs/functional-data-analysis.md`)
  - Руководство по функциональному анализу данных
- **Clustering visualization** (`docs/chronicles/clustering-visualization.txt`) in ASCII art format
  - Визуализация кластеризации в формате ASCII-арт

### Changed
- Enhanced demo page with bilingual interface (English/Russian)
  - Улучшена демо-страница с двуязычным интерфейсом (английский/русский)
- Updated `DEMO.md` with comprehensive bilingual testing instructions
  - Обновлён `DEMO.md` с подробными двуязычными инструкциями по тестированию

## [1.0.0] - 2025-01-XX

### Added
- Initial release
- 4 unique network formations (Quantum Cortex, Hyperdimensional Mesh, Neural Vortex, Synaptic Cloud)
- Interactive controls (click to pulse, drag to rotate)
- Theme selector with 4 color palettes
- Density control slider
- Custom shaders with noise functions
- Post-processing effects (Bloom, Film)
- Starfield background
- Responsive UI with glassmorphism design
- Centralized constants configuration
- TypeScript support
- Vite build system

### Features
- Real-time network visualization
- Energy pulse effects on click/tap
- Camera controls with auto-rotate
- Pause/play animation
- Export-ready project structure

