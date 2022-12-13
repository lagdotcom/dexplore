import { closeContextMenu, openDialog } from "../store/slices/app";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import ContextMenu from "./ContextMenu";
import { removeToken } from "../store/slices/tokens";
import { selectContextMenu } from "../store/selectors";
import { useCallback } from "react";

export default function TokenContextMenu() {
  const dispatch = useAppDispatch();
  const menu = useAppSelector(selectContextMenu);

  const onEdit = useCallback(() => {
    if (menu?.type === "token")
      dispatch(openDialog({ type: "token", id: menu.id }));
    dispatch(closeContextMenu());
  }, [dispatch, menu]);
  const onDelete = useCallback(() => {
    if (menu?.type === "token") dispatch(removeToken(menu.id));
    dispatch(closeContextMenu());
  }, [dispatch, menu]);

  return (
    <ContextMenu type="token">
      <button onClick={onEdit}>Edit...</button>
      <button onClick={onDelete}>Delete</button>
    </ContextMenu>
  );
}
