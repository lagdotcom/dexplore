import ScrollableCanvas, { RenderCallback } from "../ScrollableCanvas";
import { useCallback, useState } from "react";

import Box from "ui-box";
import CanvasPosition from "../../types/CanvasPosition";
import TokenLayer from "../TokenLayer";
import { addTokens } from "../../store/slices/tokens";
import getGridSize from "../../logic/getGridSize";
import { useAppDispatch } from "../../store/hooks";
import { useEffectOnce } from "react-use";

function start(offset: number, size: number) {
  const position = offset % size;
  return position < 0 ? position + size : position;
}

export default function MainDisplay() {
  const [pos, setPos] = useState<CanvasPosition>({ x: 0, y: 0, z: 1 });

  const dispatch = useAppDispatch();
  useEffectOnce(() => {
    dispatch(
      addTokens([
        {
          id: "Birnotec",
          url: "https://lagdotcom.github.io/dndavies-assets/tk/birnotec.png",
          x: 2,
          y: 3,
          size: 1,
        },
        {
          id: "Vassetri",
          url: "https://5e.tools/img/MM/Yuan-ti%20Abomination.png",
          x: 4,
          y: 4,
          size: 2,
        },
        {
          id: "Vassetri2",
          url: "https://5e.tools/img/MPMM/Yuan-ti%20Anathema.png",
          x: 6,
          y: 3,
          size: 3,
        },
      ])
    );
  });

  const render = useCallback<RenderCallback>((ctx, canvas, xo, yo, zoom) => {
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    // TODO replace with a pattern?
    const gridSize = getGridSize(zoom);
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

    setPos({ x: xo, y: yo, z: zoom });
  }, []);

  return (
    <Box position="relative">
      <ScrollableCanvas onPaint={render} />
      <TokenLayer position={pos} />
    </Box>
  );
}
