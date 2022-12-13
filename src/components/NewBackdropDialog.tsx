import {
  CSSProperties,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import Backdrop from "../types/Backdrop";
import BackdropFields from "./BackdropFields";
import { addBackdrop } from "../store/slices/backdrops";
import { closeDialog } from "../store/slices/app";
import dialogStyle from "../styles/dialog";
import { selectDialog } from "../store/selectors";
import { v4 } from "uuid";

const headerStyle: CSSProperties = { display: "flex" };

const headerTextStyle: CSSProperties = { flexGrow: 1 };

export default function NewBackdropDialog() {
  const labelId = useId();
  const dispatch = useAppDispatch();
  const dialog = useAppSelector(selectDialog);
  const [backdrop, setBackdrop] = useState<Backdrop>({
    id: "",
    url: "",
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  });

  useEffect(() => {
    if (dialog?.type === "newBackdrop")
      setBackdrop({
        id: v4(),
        url: "",
        x: dialog.x,
        y: dialog.y,
        width: 1,
        height: 1,
      });
  }, [dialog]);

  const onClickOK = useCallback(() => {
    dispatch(addBackdrop(backdrop));
    dispatch(closeDialog());
  }, [backdrop, dispatch]);

  const isInvalid = useMemo(() => {
    if (!backdrop.id) return true;
    if (!backdrop.url) return true;
  }, [backdrop.id, backdrop.url]);

  const img = useMemo(() => {
    if (dialog?.type === "newBackdrop" && backdrop.url)
      return (
        <img src={backdrop.url} alt={backdrop.id} width={64} height={64} />
      );
  }, [backdrop.id, backdrop.url, dialog?.type]);

  if (dialog?.type === "newBackdrop")
    return (
      <div role="dialog" aria-labelledby={labelId} style={dialogStyle}>
        <div style={headerStyle}>
          <h2 id={labelId} style={headerTextStyle}>
            New Backdrop...
          </h2>
          {img}
        </div>

        <BackdropFields isNew backdrop={backdrop} setBackdrop={setBackdrop} />
        <button disabled={isInvalid} onClick={onClickOK}>
          OK
        </button>
      </div>
    );
  return null;
}
