import { CSSProperties, useCallback, useMemo } from "react";
import { closeContextMenu, openDialog } from "../store/slices/app";
import { selectContextMenu, selectPosition } from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import { ActiveZ } from "../logic/layers";
import getGridCoordinate from "../logic/getGridCoordinate";

export default function NewContextMenu() {
  const dispatch = useAppDispatch();
  const menu = useAppSelector(selectContextMenu);
  const position = useAppSelector(selectPosition);

  const onNewBackdrop = useCallback(() => {
    dispatch(closeContextMenu());

    if (menu) {
      const [x, y] = getGridCoordinate(
        position.x,
        position.y,
        position.z,
        menu.x,
        menu.y,
        Math.floor
      );
      dispatch(openDialog({ type: "newBackdrop", x, y }));
    }
  }, [dispatch, menu, position]);
  const onNewToken = useCallback(() => {
    dispatch(closeContextMenu());

    if (menu) {
      const [x, y] = getGridCoordinate(
        position.x,
        position.y,
        position.z,
        menu.x,
        menu.y,
        Math.floor
      );
      dispatch(openDialog({ type: "newToken", x, y }));
    }
  }, [dispatch, menu, position]);

  const style = useMemo<CSSProperties>(
    () => ({
      position: "absolute",
      zIndex: ActiveZ,
      left: menu && `${menu.x}px`,
      top: menu && `${menu.y}px`,
      background: "white",
      border: "1px solid black",
      padding: 4,
      display: menu?.type === "new" ? "flex" : "none",
      flexDirection: "column",
    }),
    [menu]
  );

  return (
    <div style={style}>
      <button onClick={onNewBackdrop}>New Backdrop...</button>
      <button onClick={onNewToken}>New Token...</button>
    </div>
  );
}
