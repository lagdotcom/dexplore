import {
  CSSProperties,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import Token from "../types/Token";
import TokenFields from "./TokenFields";
import { addToken } from "../store/slices/tokens";
import { closeDialog } from "../store/slices/app";
import dialogStyle from "../styles/dialog";
import { selectDialog } from "../store/selectors";
import { v4 } from "uuid";

const headerStyle: CSSProperties = { display: "flex" };

const headerTextStyle: CSSProperties = { flexGrow: 1 };

export default function NewTokenDialog() {
  const labelId = useId();
  const dispatch = useAppDispatch();
  const dialog = useAppSelector(selectDialog);
  const [token, setToken] = useState<Token>({
    id: "",
    url: "",
    x: 0,
    y: 0,
    size: 1,
  });

  useEffect(() => {
    if (dialog?.type === "newToken")
      setToken({ id: v4(), url: "", x: dialog.x, y: dialog.y, size: 1 });
  }, [dialog]);

  const onClickOK = useCallback(() => {
    dispatch(addToken(token));
    dispatch(closeDialog());
  }, [dispatch, token]);

  const isInvalid = useMemo(() => {
    if (!token.id) return true;
    if (!token.url) return true;
  }, [token.id, token.url]);

  const img = useMemo(() => {
    if (dialog?.type === "newToken" && token.url)
      return <img src={token.url} alt={token.id} width={64} height={64} />;
  }, [dialog?.type, token.id, token.url]);

  if (dialog?.type === "newToken")
    return (
      <div role="dialog" aria-labelledby={labelId} style={dialogStyle}>
        <div style={headerStyle}>
          <h2 id={labelId} style={headerTextStyle}>
            New Token...
          </h2>
          {img}
        </div>

        <TokenFields isNew token={token} setToken={setToken} />
        <button disabled={isInvalid} onClick={onClickOK}>
          OK
        </button>
      </div>
    );
  return null;
}
