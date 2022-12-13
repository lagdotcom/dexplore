import { Box, ButtonGroup } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import ToggleButton from "./ToggleButton";
import { ToolbarZ } from "../logic/layers";
import { selectActiveLayer } from "../store/selectors";
import { setActiveLayer } from "../store/slices/app";
import { useCallback } from "react";

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
    <Box position="absolute" left={2} bottom={2} zIndex={ToolbarZ}>
      <ButtonGroup>
        <ToggleButton onClick={onClickBackdrop} isActive={layer === "backdrop"}>
          Backdrop
        </ToggleButton>
        <ToggleButton onClick={onClickToken} isActive={layer === "token"}>
          Token
        </ToggleButton>
      </ButtonGroup>
    </Box>
  );
}
