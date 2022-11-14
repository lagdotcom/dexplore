import ScrollableCanvas, { RenderCallback } from "./ScrollableCanvas";

import { useCallback } from "react";

const gridDefaultSize = 100;

function start(offset: number, size: number) {
  const position = offset % size;
  return position < 0 ? position + size : position;
}

export default function App() {
  const render = useCallback<RenderCallback>((ctx, canvas, xo, yo, zoom) => {
    const { width, height } = canvas;

    ctx.clearRect(0, 0, width, height);
    ctx.imageSmoothingEnabled = false;

    // TODO replace with a pattern?
    const gridSize = gridDefaultSize * zoom;
    const sx = start(xo, gridSize);
    const sy = start(yo, gridSize);

    ctx.strokeStyle = "silver";

    for (let x = sx; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = sy; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }, []);

  return <ScrollableCanvas onPaint={render} />;
}
