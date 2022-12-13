import { DragEventHandler, useCallback } from "react";

import DragInfo from "../types/DragInfo";
import { DragInfoData } from "../logic/symbols";
import getGridCoordinate from "../logic/getGridCoordinate";
import unpack from "../logic/unpack";
import { updateBackdrop } from "../store/slices/backdrops";
import { updateToken } from "../store/slices/tokens";
import { useAppDispatch } from "../store/hooks";

export default function useThingDrop(
  xo: number,
  yo: number,
  zoom: number
): {
  onDragOver: DragEventHandler;
  onDrop: DragEventHandler;
} {
  const dispatch = useAppDispatch();

  const onDragOver = useCallback<DragEventHandler>((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback<DragEventHandler>(
    (e) => {
      e.preventDefault();

      const { id, type, ox, oy } = unpack<DragInfo>(
        e.dataTransfer.getData(DragInfoData)
      );
      const [x, y] = getGridCoordinate(
        xo + ox,
        yo + oy,
        zoom,
        e.clientX,
        e.clientY
      );

      const message =
        type === "backdrop"
          ? updateBackdrop({ id, changes: { x, y } })
          : updateToken({ id, changes: { x, y } });
      dispatch(message);
    },
    [dispatch, xo, yo, zoom]
  );

  return { onDragOver, onDrop };
}
