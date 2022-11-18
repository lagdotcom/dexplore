import CanvasPosition from "../../types/CanvasPosition";
import TokenDisplay from "./TokenDisplay";
import { selectAllTokens } from "../../store/selectors";
import { useAppSelector } from "../../store/hooks";

type Props = { position: CanvasPosition };

export default function TokenLayer({ position }: Props) {
  const tokens = useAppSelector(selectAllTokens);

  return (
    <>
      {tokens.map((token) => (
        <TokenDisplay key={token.id} position={position} token={token} />
      ))}
    </>
  );
}
