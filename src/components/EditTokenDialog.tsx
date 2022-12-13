import {
  CSSProperties,
  SetStateAction,
  useCallback,
  useId,
  useMemo,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import Token from "../types/Token";
import TokenFields from "./TokenFields";
import { closeDialog } from "../store/slices/app";
import dialogStyle from "../styles/dialog";
import { selectTokenDictionary } from "../store/selectors";
import { updateToken } from "../store/slices/tokens";
import { useEffectOnce } from "react-use";

const headerStyle: CSSProperties = { display: "flex" };

const headerTextStyle: CSSProperties = { flexGrow: 1 };

const buttonBarStyle: CSSProperties = { display: "flex" };

const buttonStyle: CSSProperties = { flexGrow: 1 };

type Props = { id: Token["id"] };

export default function EditTokenDialog({ id }: Props) {
  const labelId = useId();
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectTokenDictionary);
  const [original, setOriginal] = useState<Token>({
    id: "",
    url: "",
    x: 0,
    y: 0,
    size: 1,
  });
  const [token, setToken] = useState<Token>({
    id: "",
    url: "",
    x: 0,
    y: 0,
    size: 1,
  });

  useEffectOnce(() => {
    const old = tokens[id];
    if (old) {
      setOriginal(old);
      setToken(old);
    }
  });

  const onUpdate = useCallback(
    (act: SetStateAction<Token>) => {
      const value = typeof act === "function" ? act(token) : act;
      setToken(value);
      dispatch(updateToken({ id, changes: value }));
    },
    [token, dispatch, id]
  );

  const onClickOK = useCallback(() => {
    dispatch(closeDialog());
  }, [dispatch]);

  const onClickCancel = useCallback(() => {
    dispatch(updateToken({ id, changes: original }));
    dispatch(closeDialog());
  }, [dispatch, id, original]);

  const isInvalid = useMemo(() => {
    if (!token.id) return true;
    if (!token.url) return true;
  }, [token.id, token.url]);

  const img = useMemo(() => {
    if (token.url)
      return <img src={token.url} alt={token.id} width={64} height={64} />;
  }, [token.id, token.url]);

  return (
    <div role="dialog" aria-labelledby={labelId} style={dialogStyle}>
      <div style={headerStyle}>
        <h2 id={labelId} style={headerTextStyle}>
          Edit Token...
        </h2>
        {img}
      </div>

      <TokenFields token={token} setToken={onUpdate} />
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
