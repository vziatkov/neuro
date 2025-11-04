# 🧠 Neuro

> *"At first, we just wanted to bring the network to life. To make abstract nodes and lines transform into something breathing, responsive to touch. But Neuro — as often happens with good ideas — quietly grew into something more than a three-dimensional neural network visualization. It became a mirror."*

---

**Neuro** is an interactive 3D visualization of neural networks, where every pulse, every stream of light, is a reminder that billions of the same connections work inside us, forming consciousness, memory, feelings.

We are that very network. And by observing Neuro, we observe ourselves, only in a different form — in the language of photons and vectors, not neurons and synapses.

*Quantum Cortex* is a breath. *Neural Vortex* is doubt. *Synaptic Cloud* is a dream dissolving into infinity. And *ASCII Network* — nostalgia for a time when we still believed everything could be explained by symbols.

💫 *Made with love, photons, and a quiet desire to understand what it means to be alive.*

---

## 🎯 What is it?

Interactive **3D visualization** of neural networks on Three.js with support for:
- Energy pulses through the network
- 7 unique formations
- Biometric flows (breath, heart, emotions)
- Adjustable density and visual themes
- Custom shaders and post-processing

![Interactive Neural Network](https://img.shields.io/badge/Three.js-3D_Visualization-000000?style=for-the-badge&logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

### 🌌 Network Formations

- **🌌 Quantum Cortex** — radial hierarchy, where each node is a breath
- **🔮 Hyperdimensional Mesh** — multidimensional space of connections
- **🌪️ Neural Vortex** — spiral structure twisting into infinity
- **☁️ Synaptic Cloud** — organic clusters, a dream dissolving in space
- **📐 Grid Network** — perfect 100×100 structure, order from chaos
- **⭕ Sphere Formation** — spherical distribution, wholeness
- **🔤 ASCII Neural Network** — nostalgia for symbols, when everything could be explained

### 🎮 Interactivity

- **Click/Tap** — create energy pulses through the network
- **Drag** — rotate camera around the network
- **🧬 Biometric Mode** — automatic pulses from breath, heart, and emotions
- **Density Control** — adjust number of nodes (20-100%)
- **Theme Switching** — 4 color palettes
- **Pause/Play** — control animation

### 🎨 Visual Effects

- Custom GLSL shaders with noise functions
- Bloom and film post-processing
- Dynamic color palettes
- Particle-based node visualization
- Animated connections with flow effects

### 🧬 Biometric Flows

- **Breath** (12 BPM) — slow, deep cycle
- **Heart** (72 BPM) — fast rhythmic pulsation
- **Emotions** — slow state changes (stress/calm/focus)
- **Interconnections** — cascading effects between layers

## 🎨 Gallery

Explore the diverse neural network formations and visualizations:

<div align="center">

### 🌌 Quantum Cortex
![Quantum Cortex](Screenshot%202025-11-02%20at%2022.49.07.png)
*Radial network structure with glowing connections*

### 📐 Grid Network
![Grid Network](Screenshot%202025-11-02%20at%2022.49.11.png)
*Perfectly structured 100×100 formation*

### ⭕ Sphere Formation
![Sphere Formation](Screenshot%202025-11-02%20at%2022.49.16.png)
*Spherical distribution of interconnected nodes*

### ☁️ Synaptic Cloud
![Synaptic Cloud](Screenshot%202025-11-02%20at%2022.49.22.png)
*Organic cluster-based neural structure*

### 🔤 ASCII Neural Network
![ASCII Neural Network](Screenshot%202025-11-02%20at%2022.49.27.png)
*Structured pattern-based network visualization*

</div>

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/vziatkov/neuro.git

# Navigate to the project directory
cd neuro

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The application will open at `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## 🎮 Usage

1. **Create Pulses**: Click or tap anywhere on the canvas — energy will spread through the network
2. **Rotate Camera**: Click and drag to rotate around the network
3. **Change Formation**: Press "Formation" to switch between network types
4. **Adjust Density**: Use the slider to control the number of nodes (20-100%)
5. **Switch Themes**: Click theme buttons to change color palettes
6. **🧬 Biometric Mode**: Enable automatic pulses from biometric sources
7. **Pause/Play**: Toggle animation with the pause button
8. **Reset Camera**: Return to the initial camera position

## 📁 Project Structure

```
neuro/
├── src/
│   ├── modules/
│   │   ├── app.ts                # Application initialization
│   │   ├── scene.ts              # Three.js scene setup and animation
│   │   ├── network.ts            # Network generation algorithms
│   │   ├── biometricSimulator.ts # Biometric flow simulator
│   │   ├── pulseTracker.ts       # Pulse propagation tracking
│   │   ├── shaders.ts            # GLSL shaders for nodes and connections
│   │   ├── config.ts             # Runtime configuration
│   │   ├── constants.ts          # All configurable constants
│   │   └── logger/               # Logging system
│   ├── main.ts                   # Entry point
│   └── style.css                 # Global styles
├── index.html
├── package.json
└── tsconfig.json
```

## ⚙️ Configuration

All visual and behavioral parameters can be configured in `src/modules/constants.ts`:

- **Camera**: FOV, position, clipping planes
- **Renderer**: pixel ratio, background color
- **Post-processing**: Bloom, Film effects
- **Network Generation**: parameters for each formation type
- **Animation**: speeds and amplitudes
- **UI**: timings and delays
- **Biometric Flows**: frequencies, intensities, interconnections between layers

## 🛠️ Tech Stack

- **Three.js** — 3D graphics library
- **TypeScript** — type-safe JavaScript
- **Vite** — fast build tool and dev server
- **GLSL** — custom shaders for rendering
- **WebGL** — low-level graphics API

## 📝 License

MIT © 2025 Vitalii Ziatkov

Free to use in personal and commercial projects.

See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/vziatkov/neuro/issues).

## 👨‍💻 Author

**Vitalii Ziatkov**

- GitHub: [@vziatkov](https://github.com/vziatkov)

## 🙏 Acknowledgments

- Three.js community for the amazing 3D library
- Inspiration from various neural network visualizations
- Multi-Circuit Theory of Consciousness concept (Jean Philippe Blankert)

---

> 💫 *"Neuro is not about neurons. It's about us, when we're not in a hurry, but simply watch how movement emerges from darkness, and for the first time in a long time, we feel that everything alive is connected by one network."*

_Made with love, photons, and a quiet desire to understand what it means to be alive._

