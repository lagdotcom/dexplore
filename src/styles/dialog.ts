import { ActiveZ } from "../logic/layers";
import { CSSProperties } from "react";

const dialogStyle: CSSProperties = {
  position: "fixed",
  zIndex: ActiveZ,
  top: "50%",
  left: "50%",
  transform: "translateX(-50%) translateY(-50%)",
  background: "white",
  border: "1px solid black",
  padding: 4,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};
export default dialogStyle;
