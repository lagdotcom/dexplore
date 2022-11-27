import BackdropDisplay from "./BackdropDisplay";
import { selectAllBackdrops } from "../store/selectors";
import { useAppSelector } from "../store/hooks";

export default function BackdropLayer() {
  const backdrops = useAppSelector(selectAllBackdrops);

  return (
    <>
      {backdrops.map((backdrop) => (
        <BackdropDisplay key={backdrop.id} backdrop={backdrop} />
      ))}
    </>
  );
}
