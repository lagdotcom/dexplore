import {
  WheelEvent as ReactWheelEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRafLoop, useWindowSize } from "react-use";

import clamp from "./tools/clamp";
import useDragListener from "./hooks/useDragListener";

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
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(1);

  const [stop, start] = useRafLoop(() => {
    const ctx = ref.current?.getContext("2d");
    if (ctx && ref.current) {
      onPaint(ctx, ref.current, x, y, z);
      stop();
    }
  }, true);

  const ref = useRef<HTMLCanvasElement>(null);
  const { width, height } = useWindowSize();

  // request an animation frame whenever any parameter changes
  useEffect(() => start(), [width, height, x, y, z, start]);

  const onDrag = useCallback((dx: number, dy: number) => {
    setX((old) => old + dx);
    setY((old) => old + dy);
  }, []);

  const onWheel = useCallback((e: ReactWheelEvent) => {
    if (e.deltaMode === WheelEvent.DOM_DELTA_PIXEL) {
      const dz = e.deltaY / -mouseZoomStep;
      setZ((old) => clamp(old + dz, minZoom, maxZoom));
    }
  }, []);

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
    />
  );
}
