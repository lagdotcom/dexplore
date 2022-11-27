import { CSSProperties, useCallback } from "react";
import { ContextOverlay, DialogOverlay } from "./Overlays";
import ScrollableCanvas, { RenderCallback } from "./ScrollableCanvas";

import BackdropLayer from "./BackdropLayer";
import NewBackdropDialog from "./NewBackdropDialog";
import NewContextMenu from "./NewContextMenu";
import NewTokenDialog from "./NewTokenDialog";
import TokenLayer from "./TokenLayer";
import { addTokens } from "../store/slices/tokens";
import getGridSize from "../logic/getGridSize";
import { setPosition } from "../store/slices/app";
import { useAppDispatch } from "../store/hooks";
import { useEffectOnce } from "react-use";

function start(offset: number, size: number) {
  const position = offset % size;
  return position < 0 ? position + size : position;
}

const style: CSSProperties = { overflow: "hidden", position: "relative" };

export default function MainDisplay() {
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

  const render = useCallback<RenderCallback>(
    (ctx, canvas, xo, yo, zoom) => {
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

      dispatch(setPosition({ x: xo, y: yo, z: zoom }));
    },
    [dispatch]
  );

  return (
    <div style={style}>
      <ScrollableCanvas onPaint={render} />
      <BackdropLayer />
      <TokenLayer />
      <ContextOverlay />
      <DialogOverlay />
      <NewContextMenu />
      <NewBackdropDialog />
      <NewTokenDialog />
    </div>
  );
}