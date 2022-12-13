import { MenuItem, MenuList } from "@chakra-ui/react";
import { closeContextMenu, openDialog } from "../store/slices/app";

import { ActiveZ } from "../logic/layers";
import { removeToken } from "../store/slices/tokens";
import { useAppDispatch } from "../store/hooks";
import { useCallback } from "react";

type Props = { id: string };

export default function TokenContextMenu({ id }: Props) {
  const dispatch = useAppDispatch();

  const onEdit = useCallback(() => {
    dispatch(openDialog({ type: "token", id }));
    dispatch(closeContextMenu());
  }, [dispatch, id]);
  const onDelete = useCallback(() => {
    dispatch(removeToken(id));
    dispatch(closeContextMenu());
  }, [dispatch, id]);

  return (
    <MenuList zIndex={ActiveZ}>
      <MenuItem onClick={onEdit}>Edit...</MenuItem>
      <MenuItem color="red" onClick={onDelete}>
        Delete
      </MenuItem>
    </MenuList>
  );
}
