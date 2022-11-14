import ScrollableCanvas, { RenderCallback } from "./ScrollableCanvas";

import Token from "./types/Token";
import { useCallback } from "react";
import useImageCache from "./hooks/useImageCache";
import { useList } from "react-use";

const gridDefaultSize = 100;

function start(offset: number, size: number) {
  const position = offset % size;
  return position < 0 ? position + size : position;
}

export default function App() {
  const [tokens] = useList<Token>([
    {
      url: "https://lagdotcom.github.io/dndavies-assets/tk/birnotec.png",
      x: 2,
      y: 3,
      size: 1,
    },
    {
      url: "https://5e.tools/img/MM/Yuan-ti%20Abomination.png",
      x: 4,
      y: 4,
      size: 2,
    },
    {
      url: "https://5e.tools/img/MPMM/Yuan-ti%20Anathema.png",
      x: 6,
      y: 3,
      size: 3,
    },
  ]);

  const getImage = useImageCache(tokens.map((tok) => tok.url));

  const render = useCallback<RenderCallback>(
    (ctx, canvas, xo, yo, zoom) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // TODO replace with a pattern?
      const gridSize = gridDefaultSize * zoom;
      const sx = start(xo, gridSize);
      const sy = start(yo, gridSize);

      ctx.lineWidth = 1;
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

      ctx.lineWidth = 5;
      ctx.strokeStyle = "red";

      for (const token of tokens) {
        const x = token.x * gridSize + xo;
        const y = token.y * gridSize + yo;
        const size = token.size * gridSize;

        const image = getImage(token.url);
        if (image) {
          ctx.drawImage(image, x, y, size, size);
        } else {
          const cx = x + size / 2;
          const cy = y + size / 2;
          ctx.beginPath();
          ctx.arc(cx, cy, size / 2, 0, 2 * Math.PI);
          ctx.stroke();
        }
      }
    },
    [getImage, tokens]
  );

  return <ScrollableCanvas onPaint={render} />;
}
