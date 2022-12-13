import { CSSProperties, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import ToggleButton from "./ToggleButton";
import { ToolbarZ } from "../logic/layers";
import { selectActiveLayer } from "../store/selectors";
import { setActiveLayer } from "../store/slices/app";

const style: CSSProperties = {
  position: "absolute",
  left: 16,
  bottom: 16,
  zIndex: ToolbarZ,
};

export default function Toolbar() {
  const dispatch = useAppDispatch();
  const layer = useAppSelector(selectActiveLayer);

  const onClickBackdrop = useCallback(
    () => dispatch(setActiveLayer("backdrop")),
    [dispatch]
  );
  const onClickToken = useCallback(
    () => dispatch(setActiveLayer("token")),
    [dispatch]
  );

  return (
    <div role="menubar" style={style}>
      <div role="group" aria-label="Active Layer">
        <ToggleButton onClick={onClickBackdrop} selected={layer === "backdrop"}>
          Backdrop
        </ToggleButton>
        <ToggleButton onClick={onClickToken} selected={layer === "token"}>
          Token
        </ToggleButton>
      </div>
    </div>
  );
}
