import { closeContextMenu, openDialog } from "../store/slices/app";
import { selectContextMenu, selectPosition } from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import ContextMenu from "./ContextMenu";
import getGridCoordinate from "../logic/getGridCoordinate";
import { useCallback } from "react";

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

  return (
    <ContextMenu type="new">
      <button onClick={onNewBackdrop}>New Backdrop...</button>
      <button onClick={onNewToken}>New Token...</button>
    </ContextMenu>
  );
}
