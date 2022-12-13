import {
  CSSProperties,
  DragEventHandler,
  MouseEventHandler,
  useCallback,
  useMemo,
} from "react";
import { openContextMenu, setDragging } from "../store/slices/app";
import {
  selectActiveLayer,
  selectDraggingId,
  selectPosition,
} from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import DragInfo from "../types/DragInfo";
import { DragInfoData } from "../logic/symbols";
import Token from "../types/Token";
import { TokenZ } from "../logic/layers";
import getGridSize from "../logic/getGridSize";
import pack from "../logic/pack";
import useThingDrop from "../hooks/useThingDrop";

type Props = { token: Token };

export default function TokenDisplay({ token }: Props) {
  const dispatch = useAppDispatch();
  const position = useAppSelector(selectPosition);
  const layer = useAppSelector(selectActiveLayer);
  const gridSize = useMemo(() => getGridSize(position.z), [position.z]);

  const left = useMemo(
    () => token.x * gridSize + position.x,
    [gridSize, position.x, token.x]
  );
  const top = useMemo(
    () => token.y * gridSize + position.y,
    [gridSize, position.y, token.y]
  );
  const size = useMemo(() => gridSize * token.size, [gridSize, token.size]);

  const onDragStart = useCallback<DragEventHandler>(
    (e) => {
      const ox = e.clientX - left;
      const oy = e.clientY - top;
      e.dataTransfer.setData(
        DragInfoData,
        pack<DragInfo>({ id: token.id, type: "token", ox, oy })
      );
      e.dataTransfer.effectAllowed = "move";

      dispatch(setDragging(token.id));
    },
    [dispatch, left, token.id, top]
  );

  const onDragEnd = useCallback<DragEventHandler>(() => {
    dispatch(setDragging());
  }, [dispatch]);

  const { onDragOver, onDrop } = useThingDrop(
    position.x,
    position.y,
    position.z
  );

  const onContextMenu = useCallback<MouseEventHandler>(
    (e) => {
      dispatch(
        openContextMenu({
          type: "token",
          id: token.id,
          x: e.clientX,
          y: e.clientY,
        })
      );
      e.preventDefault();
    },
    [token.id, dispatch]
  );

  const draggingId = useAppSelector(selectDraggingId);
  const pointerEvents = useMemo(() => {
    if (layer !== "token") return "none";
    if (!draggingId) return "all";
    if (draggingId === token.id) return "all";
    return "none";
  }, [draggingId, layer, token.id]);

  const style = useMemo<CSSProperties>(
    () => ({
      position: "absolute",
      cursor: "pointer",
      pointerEvents,
      left,
      top,
      zIndex: TokenZ - token.size,
      width: size,
      height: size,
    }),
    [left, pointerEvents, size, token.size, top]
  );

  return (
    <div
      draggable="true"
      style={style}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onContextMenu={onContextMenu}
    >
      <img src={token.url} alt={token.id} width={size} height={size} />
    </div>
  );
}
