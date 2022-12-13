import { Dispatch, SetStateAction } from "react";
import { NumberField, TextField } from "./Fields";

import { Flex } from "@chakra-ui/react";
import Token from "../types/Token";
import useFieldUpdater from "../hooks/useFieldUpdater";

type Props = {
  token: Token;
  setToken: Dispatch<SetStateAction<Token>>;
  isNew?: boolean;
};

export default function TokenFields({ token, setToken, isNew = false }: Props) {
  const setID = useFieldUpdater(setToken, "id");
  const setUrl = useFieldUpdater(setToken, "url");
  const setX = useFieldUpdater(setToken, "x");
  const setY = useFieldUpdater(setToken, "y");
  const setSize = useFieldUpdater(setToken, "size");

  return (
    <fieldset>
      <TextField
        label="ID"
        value={token.id}
        setValue={setID}
        readOnly={!isNew}
      />
      <TextField label="URL" value={token.url} setValue={setUrl} />
      <Flex>
        <NumberField label="X" value={token.x} setValue={setX} />
        <NumberField label="Y" value={token.y} setValue={setY} />
        <NumberField
          label="Size"
          value={token.size}
          setValue={setSize}
          min={1}
          max={5}
        />
      </Flex>
    </fieldset>
  );
}
