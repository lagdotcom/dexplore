import {
  MouseEvent as ReactMouseEvent,
  useCallback,
  useMemo,
  useState,
} from "react";

import useFlag from "./useFlag";

type DragCallback = (x: number, y: number) => void;

export default function useDragListener(callback: DragCallback) {
  const [active, { clear, set }] = useFlag(false);
  const [x, setX] = useState(NaN);
  const [y, setY] = useState(NaN);

  const cursor = useMemo(() => (active ? "grabbing" : "grab"), [active]);

  const onMouseDown = useCallback(
    (e: ReactMouseEvent) => {
      set();
      setX(e.clientX);
      setY(e.clientY);
    },
    [set]
  );
  const onMouseMove = useCallback(
    (e: ReactMouseEvent) => {
      if (active) {
        const dx = e.clientX - x;
        const dy = e.clientY - y;
        callback(dx, dy);

        setX(e.clientX);
        setY(e.clientY);
      }
    },
    [active, callback, x, y]
  );

  return { cursor, onMouseDown, onMouseUp: clear, onMouseMove };
}
