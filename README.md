# 🧠 Interactive Neural Network

An interactive **3D visualization** of neural networks using Three.js.  
Click to create energy pulses through the network, change formations, adjust density, and explore different visual themes.

> 🎯 **Neuro** — interactive neural network visualization with custom shaders, post-processing, and real-time effects

Version License TypeScript

![Interactive Neural Network](https://img.shields.io/badge/Three.js-3D_Visualization-000000?style=for-the-badge&logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

- **7 Unique Network Formations**:
  - 🌌 Quantum Cortex
  - 🔮 Hyperdimensional Mesh
  - 🌪️ Neural Vortex
  - ☁️ Synaptic Cloud
  - 📐 Grid Network
  - ⭕ Sphere Formation
  - 🔤 ASCII Neural Network

- **Interactive Controls**:
  - Click or tap to create energy pulses through the network
  - Drag to rotate the camera
  - Adjustable network density
  - Real-time theme switching

- **Visual Effects**:
  - Custom shaders with noise functions
  - Bloom and film post-processing
  - Dynamic color palettes
  - Particle-based node visualization
  - Animated connections with flow effects

- **Responsive UI**:
  - Modern glassmorphism design
  - Mobile-friendly controls
  - Theme selector with 4 color palettes
  - Density slider

## 🎨 Gallery

Explore the diverse neural network formations and visualizations:

<div align="center">

### 🌌 Quantum Cortex
![Quantum Cortex](Screenshot%202025-11-02%20at%2022.49.07.png)
*Radial network structure with glowing connections*

### 📐 Grid Network
![Grid Network](Screenshot%202025-11-02%20at%2022.49.11.png)
*Perfectly structured 100×100 grid formation*

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

1. **Create Pulses**: Click or tap anywhere on the canvas to send energy pulses through the network
2. **Rotate Camera**: Click and drag to orbit around the network
3. **Change Formation**: Click the "Formation" button to cycle through different network types
4. **Adjust Density**: Use the density slider to control the number of nodes (20-100%)
5. **Switch Themes**: Click on the theme buttons to change color palettes
6. **Pause/Play**: Toggle animation with the pause button
7. **Reset Camera**: Return to the initial camera position

## 📁 Project Structure

```
neuro/
├── src/
│   ├── modules/
│   │   ├── app.ts          # Application initialization
│   │   ├── scene.ts        # Three.js scene setup and animation
│   │   ├── network.ts      # Network generation algorithms
│   │   ├── shaders.ts      # GLSL shaders for nodes and connections
│   │   ├── config.ts       # Runtime configuration
│   │   └── constants.ts    # All configurable constants
│   ├── main.ts             # Entry point
│   └── style.css           # Global styles
├── index.html
├── package.json
└── tsconfig.json
```

## ⚙️ Configuration

All visual and behavioral parameters can be configured in `src/modules/constants.ts`:

- Camera settings (FOV, position, clipping planes)
- Renderer options (pixel ratio, clear color)
- Post-processing effects (Bloom, Film)
- Network generation parameters for each formation type
- Animation speeds and amplitudes
- UI timing and delays

## 🛠️ Tech Stack

- **Three.js** - 3D graphics library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **GLSL** - Custom shaders for rendering

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

---

> 💡 _Made with ❤️ and WebGL for developers who love beautiful 3D visualizations_

