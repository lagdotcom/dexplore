import {
  CSSProperties,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { NumberField, TextField } from "./Fields";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import { ActiveZ } from "../logic/layers";
import { addBackdrop } from "../store/slices/backdrops";
import { closeDialog } from "../store/slices/app";
import { selectDialog } from "../store/selectors";
import { v4 } from "uuid";

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

const headerStyle: CSSProperties = { display: "flex" };

const headerTextStyle: CSSProperties = { flexGrow: 1 };

export default function NewBackdropDialog() {
  const labelId = useId();
  const dispatch = useAppDispatch();
  const dialog = useAppSelector(selectDialog);

  const [id, setId] = useState("");
  const [url, setUrl] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);

  useEffect(() => {
    if (dialog?.type === "newBackdrop") {
      setId(v4());
      setUrl("");
      setX(dialog.x);
      setY(dialog.y);
      setWidth(1);
      setHeight(1);
    }
  }, [dialog]);

  const onClickOK = useCallback(() => {
    dispatch(addBackdrop({ id, url, x, y, width, height }));
    dispatch(closeDialog());
  }, [dispatch, height, id, url, width, x, y]);

  const isInvalid = useMemo(() => {
    if (!id) return true;
    if (!url) return true;
  }, [id, url]);

  const img = useMemo(() => {
    if (dialog?.type === "newBackdrop" && url)
      return <img src={url} alt={id} width={64} height={64} />;
  }, [dialog?.type, id, url]);

  if (dialog?.type === "newBackdrop")
    return (
      <div role="dialog" aria-labelledby={labelId} style={dialogStyle}>
        <div style={headerStyle}>
          <h2 id={labelId} style={headerTextStyle}>
            New Backdrop...
          </h2>
          {img}
        </div>

        <TextField label="ID" value={id} setValue={setId} />
        <TextField label="URL" value={url} setValue={setUrl} />
        <NumberField label="X" value={x} setValue={setX} />
        <NumberField label="Y" value={y} setValue={setY} />
        <NumberField label="Width" value={width} setValue={setWidth} min={1} />
        <NumberField
          label="Height"
          value={height}
          setValue={setHeight}
          min={1}
        />
        <button disabled={isInvalid} onClick={onClickOK}>
          OK
        </button>
      </div>
    );
  return null;
}
