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
import { addToken } from "../store/slices/tokens";
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

export default function NewTokenDialog() {
  const labelId = useId();
  const dispatch = useAppDispatch();
  const dialog = useAppSelector(selectDialog);

  const [id, setId] = useState("");
  const [url, setUrl] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [size, setSize] = useState(1);

  useEffect(() => {
    if (dialog?.type === "newToken") {
      setId(v4());
      setUrl("");
      setX(dialog.x);
      setY(dialog.y);
      setSize(1);
    }
  }, [dialog]);

  const onClickOK = useCallback(() => {
    dispatch(addToken({ id, url, x, y, size }));
    dispatch(closeDialog());
  }, [dispatch, id, size, url, x, y]);

  const isInvalid = useMemo(() => {
    if (!id) return true;
    if (!url) return true;
  }, [id, url]);

  const img = useMemo(() => {
    if (dialog?.type === "newToken" && url)
      return <img src={url} alt={id} width={64} height={64} />;
  }, [dialog?.type, id, url]);

  if (dialog?.type === "newToken")
    return (
      <div role="dialog" aria-labelledby={labelId} style={dialogStyle}>
        <div style={headerStyle}>
          <h2 id={labelId} style={headerTextStyle}>
            New Token...
          </h2>
          {img}
        </div>

        <TextField label="ID" value={id} setValue={setId} />
        <TextField label="URL" value={url} setValue={setUrl} />
        <NumberField label="X" value={x} setValue={setX} />
        <NumberField label="Y" value={y} setValue={setY} />
        <NumberField
          label="Size"
          value={size}
          setValue={setSize}
          min={1}
          max={5}
        />
        <button disabled={isInvalid} onClick={onClickOK}>
          OK
        </button>
      </div>
    );
  return null;
}
