import { CSSProperties, useCallback, useId, useMemo, useState } from "react";

import Token from "../types/Token";
import TokenFields from "./TokenFields";
import { addToken } from "../store/slices/tokens";
import { closeDialog } from "../store/slices/app";
import dialogStyle from "../styles/dialog";
import { useAppDispatch } from "../store/hooks";
import { v4 } from "uuid";

const headerStyle: CSSProperties = { display: "flex" };

const headerTextStyle: CSSProperties = { flexGrow: 1 };

type Props = { x: number; y: number };

export default function NewTokenDialog({ x, y }: Props) {
  const labelId = useId();
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<Token>({
    id: v4(),
    url: "",
    x,
    y,
    size: 1,
  });

  const onClickOK = useCallback(() => {
    dispatch(addToken(token));
    dispatch(closeDialog());
  }, [dispatch, token]);

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
}
