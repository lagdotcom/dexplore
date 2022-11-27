import TokenDisplay from "./TokenDisplay";
import { selectAllTokens } from "../store/selectors";
import { useAppSelector } from "../store/hooks";

export default function TokenLayer() {
  const tokens = useAppSelector(selectAllTokens);

  return (
    <>
      {tokens.map((token) => (
        <TokenDisplay key={token.id} token={token} />
      ))}
    </>
  );
}
