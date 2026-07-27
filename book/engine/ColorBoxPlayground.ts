export interface ColorBoxTheme {
  background: string;
  grid: string;
  primary: string;
  muted: string;
  accent: string;
  success: string;
  accentFill: string;
  successFill: string;
}

export interface ColorBoxState {
  useGreenColor: boolean;
}

export class ColorBoxPlayground {
  private state: ColorBoxState = {
    useGreenColor: false,
  };

  constructor(private readonly theme: ColorBoxTheme) {}

  setState(nextState: Partial<ColorBoxState>): void {
    this.state = { ...this.state, ...nextState };
  }

  render(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    this.clear(ctx, width, height);
    this.drawGrid(ctx, width, height);

    const color = this.state.useGreenColor ? this.theme.success : this.theme.accent;
    const fill = this.state.useGreenColor ? this.theme.successFill : this.theme.accentFill;
    const center = { x: width * 0.5, y: height * 0.52 };
    const size = Math.min(width, height) * 0.28;

    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = 20;
    ctx.fillStyle = fill;
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.fillRect(center.x - size / 2, center.y - size / 2, size, size);
    ctx.strokeRect(center.x - size / 2, center.y - size / 2, size, size);
    ctx.restore();

    this.drawLabel(ctx, "one checkbox -> one render state", 48, 54, this.theme.primary);
    this.drawLabel(ctx, `current color: ${this.state.useGreenColor ? "green" : "orange"}`, 48, 76, color);
    this.drawLabel(ctx, "first tiny OOP playground class", 48, height - 28, this.theme.muted);
  }

  private clear(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = this.theme.background;
    ctx.fillRect(0, 0, width, height);
  }

  private drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    ctx.save();
    ctx.strokeStyle = this.theme.grid;
    ctx.lineWidth = 1;

    for (let x = 0; x <= width; x += 42) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += 42) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.restore();
  }

  private drawLabel(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string): void {
    ctx.fillStyle = color;
    ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.fillText(text, x, y);
  }
}
