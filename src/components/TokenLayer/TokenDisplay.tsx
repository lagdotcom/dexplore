import {
  CSSProperties,
  DragEventHandler,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import CanvasPosition from "../../types/CanvasPosition";
import DragInfo from "../../types/DragInfo";
import { DragInfoData } from "../../logic/symbols";
import Token from "../../types/Token";
import { TokenLayer } from "../../logic/layers";
import getGridSize from "../../logic/getGridSize";
import pack from "../../logic/pack";
import { selectDraggingTokenId } from "../../store/selectors";
import { setDragging } from "../../store/slices/app";
import useTokenDrop from "../../hooks/useTokenDrop";

type Props = { position: CanvasPosition; token: Token };

export default function TokenDisplay({ position, token }: Props) {
  const imgRef = useRef(null);
  const dispatch = useAppDispatch();
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
        pack<DragInfo>({ id: token.id, ox, oy })
      );
      e.dataTransfer.effectAllowed = "move";

      dispatch(setDragging(token.id));
    },
    [dispatch, left, token.id, top]
  );

  const onDragEnd = useCallback<DragEventHandler>(() => {
    dispatch(setDragging());
  }, [dispatch]);

  const { onDragOver, onDrop } = useTokenDrop(
    position.x,
    position.y,
    position.z
  );

  // TODO replace with generic token image if it failed to load
  const onError = useCallback(() => {
    console.log("error", token.url);
  }, [token.url]);

  // TODO this doesn't let you move big tokens onto other spaces they occupy
  const draggingId = useAppSelector(selectDraggingTokenId);
  const pointerEvents = useMemo(
    () => (draggingId ? (draggingId === token.id ? "all" : "none") : "all"),
    [draggingId, token.id]
  );

  // this saves on ui-box making a new class for every single combination of left and top
  const style = useMemo<CSSProperties>(
    () => ({
      position: "absolute",
      cursor: "pointer",
      pointerEvents,
      left,
      top,
      zIndex: TokenLayer - token.size,
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
    >
      <img
        ref={imgRef}
        src={token.url}
        alt={token.id}
        width={size}
        height={size}
        onError={onError}
      />
    </div>
  );
}
