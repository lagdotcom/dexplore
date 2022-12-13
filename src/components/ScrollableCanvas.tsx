import {
  MouseEventHandler,
  WheelEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useDragListener, { DragHandler } from "../hooks/useDragListener";
import { useRafLoop, useWindowSize } from "react-use";

import clamp from "../tools/clamp";
import { openContextMenu } from "../store/slices/app";
import { useAppDispatch } from "../store/hooks";
import useThingDrop from "../hooks/useThingDrop";

export type RenderCallback = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  z: number
) => void;

type Props = { onPaint: RenderCallback };

const mouseZoomStep = 500;
const minZoom = 0.2;
const maxZoom = 3;

export default function ScrollableCanvas({ onPaint }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [xo, setXO] = useState(0);
  const [yo, setYO] = useState(0);
  const [zoom, setZoom] = useState(1);

  const [cancel, refresh] = useRafLoop(() => {
    const ctx = ref.current?.getContext("2d");
    if (ctx && ref.current) {
      onPaint(ctx, ref.current, xo, yo, zoom);
      cancel();
    }
  }, true);

  const ref = useRef<HTMLCanvasElement>(null);
  const { width, height } = useWindowSize();

  // request an animation frame whenever any parameter changes
  useEffect(() => refresh(), [width, height, xo, yo, zoom, refresh]);

  const onDrag = useCallback<DragHandler>((dx, dy) => {
    setXO((old) => old + dx);
    setYO((old) => old + dy);
  }, []);

  const onWheel = useCallback<WheelEventHandler>((e) => {
    if (e.deltaMode === WheelEvent.DOM_DELTA_PIXEL) {
      const dz = e.deltaY / -mouseZoomStep;
      setZoom((old) => clamp(old + dz, minZoom, maxZoom));
    }
  }, []);

  const onContextMenu = useCallback<MouseEventHandler>(
    (e) => {
      dispatch(openContextMenu({ type: "new", x: e.clientX, y: e.clientY }));
      e.preventDefault();
    },
    [dispatch]
  );

  const { onDragOver, onDrop } = useThingDrop(xo, yo, zoom);

  const { cursor, ...canvasProps } = useDragListener(onDrag);
  const style = useMemo(
    () => ({ cursor, width, height }),
    [cursor, height, width]
  );

  return (
    <canvas
      {...canvasProps}
      data-testid="scrollable-canvas"
      ref={ref}
      width={width}
      height={height}
      style={style}
      onWheel={onWheel}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onContextMenu={onContextMenu}
    />
  );
}
