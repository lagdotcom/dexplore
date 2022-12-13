import { closeContextMenu, openDialog } from "../store/slices/app";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import ContextMenu from "./ContextMenu";
import { removeBackdrop } from "../store/slices/backdrops";
import { selectContextMenu } from "../store/selectors";
import { useCallback } from "react";

export default function BackdropContextMenu() {
  const dispatch = useAppDispatch();
  const menu = useAppSelector(selectContextMenu);

  const onEdit = useCallback(() => {
    if (menu?.type === "backdrop")
      dispatch(openDialog({ type: "backdrop", id: menu.id }));
    dispatch(closeContextMenu());
  }, [dispatch, menu]);
  const onDelete = useCallback(() => {
    if (menu?.type === "backdrop") dispatch(removeBackdrop(menu.id));
    dispatch(closeContextMenu());
  }, [dispatch, menu]);

  return (
    <ContextMenu type="backdrop">
      <button onClick={onEdit}>Edit...</button>
      <button onClick={onDelete}>Delete</button>
    </ContextMenu>
  );
}
