import { Dispatch, SetStateAction } from "react";
import { NumberField, TextField } from "./Fields";

import Backdrop from "../types/Backdrop";
import useFieldUpdater from "../hooks/useFieldUpdater";

type Props = {
  backdrop: Backdrop;
  setBackdrop: Dispatch<SetStateAction<Backdrop>>;
  isNew?: boolean;
};

export default function BackdropFields({
  backdrop,
  setBackdrop,
  isNew = false,
}: Props) {
  const setID = useFieldUpdater(setBackdrop, "id");
  const setUrl = useFieldUpdater(setBackdrop, "url");
  const setX = useFieldUpdater(setBackdrop, "x");
  const setY = useFieldUpdater(setBackdrop, "y");
  const setWidth = useFieldUpdater(setBackdrop, "width");
  const setHeight = useFieldUpdater(setBackdrop, "height");

  return (
    <fieldset>
      <TextField
        label="ID"
        value={backdrop.id}
        setValue={setID}
        readOnly={!isNew}
      />
      <TextField label="URL" value={backdrop.url} setValue={setUrl} />
      <NumberField label="X" value={backdrop.x} setValue={setX} />
      <NumberField label="Y" value={backdrop.y} setValue={setY} />
      <NumberField
        label="Width"
        value={backdrop.width}
        setValue={setWidth}
        min={1}
      />
      <NumberField
        label="Height"
        value={backdrop.height}
        setValue={setHeight}
        min={1}
      />
    </fieldset>
  );
}
