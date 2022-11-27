import { PointerEventHandler, useCallback, useMemo, useState } from "react";

import useFlag from "./useFlag";

export type DragHandler = (dx: number, dy: number) => void;

export default function useDragListener(callback: DragHandler, button = 0) {
  const [active, { clear, set }] = useFlag(false);
  const [x, setX] = useState(NaN);
  const [y, setY] = useState(NaN);

  const cursor = useMemo(() => (active ? "grabbing" : "grab"), [active]);

  const onPointerDown = useCallback<PointerEventHandler>(
    (e) => {
      if (e.button !== button) return;

      set();
      setX(e.clientX);
      setY(e.clientY);
    },
    [button, set]
  );
  const onPointerMove = useCallback<PointerEventHandler>(
    (e) => {
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
  const onPointerUp = useCallback<PointerEventHandler>(
    (e) => {
      if (active) {
        onPointerMove(e);
        clear();
      }
    },
    [active, clear, onPointerMove]
  );

  return { cursor, onPointerDown, onPointerUp, onPointerMove };
}
