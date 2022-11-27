import { CSSProperties, MouseEventHandler, useCallback } from "react";
import { closeContextMenu, closeDialog } from "../store/slices/app";
import { selectContextMenu, selectDialog } from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import { OverlayZ } from "../logic/layers";

const style: CSSProperties = {
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  zIndex: OverlayZ,
  background: "black",
  opacity: 0.1,
};

type OverlayProps = { isShown: boolean; onClick: MouseEventHandler };

function Overlay({ isShown, onClick }: OverlayProps) {
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  if (isShown) return <div style={style} onClick={onClick} />;
  return null;
}

export function ContextOverlay() {
  const dispatch = useAppDispatch();
  const menu = useAppSelector(selectContextMenu);

  const onClick = useCallback(() => {
    dispatch(closeContextMenu());
  }, [dispatch]);

  return <Overlay isShown={!!menu} onClick={onClick} />;
}

export function DialogOverlay() {
  const dispatch = useAppDispatch();
  const dialog = useAppSelector(selectDialog);

  const onClick = useCallback(() => {
    dispatch(closeDialog());
  }, [dispatch]);

  return <Overlay isShown={!!dialog} onClick={onClick} />;
}
