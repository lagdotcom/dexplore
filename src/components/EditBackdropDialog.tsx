import {
  CSSProperties,
  SetStateAction,
  useCallback,
  useId,
  useMemo,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import Backdrop from "../types/Backdrop";
import BackdropFields from "./BackdropFields";
import { closeDialog } from "../store/slices/app";
import dialogStyle from "../styles/dialog";
import { selectBackdropDictionary } from "../store/selectors";
import { updateBackdrop } from "../store/slices/backdrops";
import { useEffectOnce } from "react-use";

const headerStyle: CSSProperties = { display: "flex" };

const headerTextStyle: CSSProperties = { flexGrow: 1 };

const buttonBarStyle: CSSProperties = { display: "flex" };

const buttonStyle: CSSProperties = { flexGrow: 1 };

type Props = { id: Backdrop["id"] };

export default function EditBackdropDialog({ id }: Props) {
  const labelId = useId();
  const dispatch = useAppDispatch();
  const backdrops = useAppSelector(selectBackdropDictionary);
  const [original, setOriginal] = useState<Backdrop>({
    id: "",
    url: "",
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  });
  const [backdrop, setBackdrop] = useState<Backdrop>({
    id: "",
    url: "",
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  });

  useEffectOnce(() => {
    const old = backdrops[id];
    if (old) {
      setOriginal(old);
      setBackdrop(old);
    }
  });

  const onUpdate = useCallback(
    (act: SetStateAction<Backdrop>) => {
      const value = typeof act === "function" ? act(backdrop) : act;
      setBackdrop(value);
      dispatch(updateBackdrop({ id, changes: value }));
    },
    [backdrop, dispatch, id]
  );

  const onClickOK = useCallback(() => {
    dispatch(closeDialog());
  }, [dispatch]);

  const onClickCancel = useCallback(() => {
    dispatch(updateBackdrop({ id, changes: original }));
    dispatch(closeDialog());
  }, [dispatch, id, original]);

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
          Edit Backdrop...
        </h2>
        {img}
      </div>

      <BackdropFields backdrop={backdrop} setBackdrop={onUpdate} />
      <div style={buttonBarStyle}>
        <button style={buttonStyle} onClick={onClickCancel}>
          Cancel
        </button>
        <button style={buttonStyle} disabled={isInvalid} onClick={onClickOK}>
          OK
        </button>
      </div>
    </div>
  );
}
