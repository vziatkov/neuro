export const defaultChartTheme = {
  name: "Warm Dark",
  canvas: {
    background: "#17120f",
    grid: "rgba(255, 255, 255, 0.06)",
    frame: "rgba(255, 255, 255, 0.16)",
    panel: "rgba(8, 6, 5, 0.86)",
    panelBorder: "rgba(99, 255, 155, 0.45)",
  },
  candles: {
    up: "#63ff9b",
    down: "#ff5c5c",
    upFill: "rgba(99, 255, 155, 0.24)",
    downFill: "rgba(255, 92, 92, 0.24)",
  },
  text: {
    primary: "#f5efe7",
    muted: "#8f8075",
    accent: "#f27d26",
    success: "#63ff9b",
    warning: "#ffd27a",
  },
  crosshair: {
    line: "rgba(99, 255, 155, 0.78)",
    guide: "rgba(255, 255, 255, 0.11)",
    axis: "rgba(242, 125, 38, 0.35)",
  },
  primitives: {
    rectangleFill: "rgba(242, 125, 38, 0.22)",
    triangleFill: "rgba(255, 220, 120, 0.2)",
  },
};
