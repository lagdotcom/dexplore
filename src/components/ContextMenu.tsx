import { CSSProperties, PropsWithChildren, useMemo } from "react";

import { ActiveZ } from "../logic/layers";
import { ContextMenuState } from "../store/slices/app";
import { selectContextMenu } from "../store/selectors";
import { useAppSelector } from "../store/hooks";

type Props = PropsWithChildren<{ type: ContextMenuState["type"] }>;

export default function ContextMenu({ children, type }: Props) {
  const menu = useAppSelector(selectContextMenu);

  const style = useMemo<CSSProperties>(
    () => ({
      position: "absolute",
      zIndex: ActiveZ,
      left: menu && `${menu.x}px`,
      top: menu && `${menu.y}px`,
      background: "white",
      border: "1px solid black",
      padding: 4,
      display: menu?.type === type ? "flex" : "none",
      flexDirection: "column",
    }),
    [menu, type]
  );

  return <div style={style}>{children}</div>;
}
