import { MenuItem, MenuList } from "@chakra-ui/react";
import { closeContextMenu, openDialog } from "../store/slices/app";

import { ActiveZ } from "../logic/layers";
import { removeBackdrop } from "../store/slices/backdrops";
import { useAppDispatch } from "../store/hooks";
import { useCallback } from "react";

type Props = { id: string };

export default function BackdropContextMenu({ id }: Props) {
  const dispatch = useAppDispatch();

  const onEdit = useCallback(() => {
    dispatch(openDialog({ type: "backdrop", id }));
    dispatch(closeContextMenu());
  }, [dispatch, id]);
  const onDelete = useCallback(() => {
    dispatch(removeBackdrop(id));
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
