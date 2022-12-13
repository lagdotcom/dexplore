import { CSSProperties, useCallback, useId, useMemo, useState } from "react";

import Backdrop from "../types/Backdrop";
import BackdropFields from "./BackdropFields";
import { addBackdrop } from "../store/slices/backdrops";
import { closeDialog } from "../store/slices/app";
import dialogStyle from "../styles/dialog";
import { useAppDispatch } from "../store/hooks";
import { v4 } from "uuid";

const headerStyle: CSSProperties = { display: "flex" };

const headerTextStyle: CSSProperties = { flexGrow: 1 };

type Props = { x: number; y: number };

export default function NewBackdropDialog({ x, y }: Props) {
  const labelId = useId();
  const dispatch = useAppDispatch();
  const [backdrop, setBackdrop] = useState<Backdrop>({
    id: v4(),
    url: "",
    x,
    y,
    width: 1,
    height: 1,
  });

  const onClickOK = useCallback(() => {
    dispatch(addBackdrop(backdrop));
    dispatch(closeDialog());
  }, [backdrop, dispatch]);

  const isInvalid = useMemo(() => {
    if (!backdrop.id) return true;
    if (!backdrop.url) return true;
  }, [backdrop.id, backdrop.url]);

  const img = useMemo(() => {
    if (backdrop.url)
      return (
        <img src={backdrop.url} alt={backdrop.id} width={64} height={64} />
      );
  }, [backdrop.id, backdrop.url]);

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
}
