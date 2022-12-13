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

import Backdrop from "../types/Backdrop";
import { BackdropZ } from "../logic/layers";
import DragInfo from "../types/DragInfo";
import { DragInfoData } from "../logic/symbols";
import getGridSize from "../logic/getGridSize";
import pack from "../logic/pack";
import useThingDrop from "../hooks/useThingDrop";

type Props = { backdrop: Backdrop };

export default function BackdropDisplay({ backdrop }: Props) {
  const dispatch = useAppDispatch();
  const position = useAppSelector(selectPosition);
  const layer = useAppSelector(selectActiveLayer);
  const gridSize = useMemo(() => getGridSize(position.z), [position.z]);

  const left = useMemo(
    () => backdrop.x * gridSize + position.x,
    [gridSize, position.x, backdrop.x]
  );
  const top = useMemo(
    () => backdrop.y * gridSize + position.y,
    [gridSize, position.y, backdrop.y]
  );
  const width = useMemo(
    () => gridSize * backdrop.width,
    [gridSize, backdrop.width]
  );
  const height = useMemo(
    () => gridSize * backdrop.height,
    [gridSize, backdrop.height]
  );

  const onDragStart = useCallback<DragEventHandler>(
    (e) => {
      const ox = e.clientX - left;
      const oy = e.clientY - top;
      e.dataTransfer.setData(
        DragInfoData,
        pack<DragInfo>({ id: backdrop.id, type: "backdrop", ox, oy })
      );
      e.dataTransfer.effectAllowed = "move";

      dispatch(setDragging(backdrop.id));
    },
    [backdrop.id, dispatch, left, top]
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
          type: "backdrop",
          id: backdrop.id,
          x: e.clientX,
          y: e.clientY,
        })
      );
      e.preventDefault();
    },
    [backdrop.id, dispatch]
  );

  const draggingId = useAppSelector(selectDraggingId);
  const pointerEvents = useMemo(() => {
    if (layer !== "backdrop") return "none";
    if (!draggingId) return "all";
    if (draggingId === backdrop.id) return "all";
    return "none";
  }, [draggingId, layer, backdrop.id]);

  const style = useMemo<CSSProperties>(
    () => ({
      position: "absolute",
      cursor: "pointer",
      pointerEvents,
      left,
      top,
      zIndex: BackdropZ,
      width,
      height,
    }),
    [height, left, pointerEvents, top, width]
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
      <img src={backdrop.url} alt={backdrop.id} width={width} height={height} />
    </div>
  );
}
