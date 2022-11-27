import { CSSProperties, useMemo } from "react";

import Backdrop from "../types/Backdrop";
import { BackdropZ } from "../logic/layers";
import getGridSize from "../logic/getGridSize";
import { selectPosition } from "../store/selectors";
import { useAppSelector } from "../store/hooks";

type Props = { backdrop: Backdrop };

export default function BackdropDisplay({ backdrop }: Props) {
  const position = useAppSelector(selectPosition);
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

  const style = useMemo<CSSProperties>(
    () => ({
      position: "absolute",
      pointerEvents: "none",
      left,
      top,
      zIndex: BackdropZ,
      width,
      height,
    }),
    [height, left, top, width]
  );

  return (
    <div style={style}>
      <img src={backdrop.url} alt={backdrop.id} width={width} height={height} />
    </div>
  );
}
