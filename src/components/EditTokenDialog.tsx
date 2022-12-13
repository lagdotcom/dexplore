import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { SetStateAction, useCallback, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import ThingPreview from "./ThingPreview";
import Token from "../types/Token";
import TokenFields from "./TokenFields";
import { closeDialog } from "../store/slices/app";
import { selectTokenDictionary } from "../store/selectors";
import { updateToken } from "../store/slices/tokens";
import { useEffectOnce } from "react-use";

type Props = { id: Token["id"] };

export default function EditTokenDialog({ id }: Props) {
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

  const onClose = useCallback(() => {
    dispatch(closeDialog());
  }, [dispatch]);

  const isInvalid = useMemo(() => {
    if (!token.id) return true;
    if (!token.url) return true;
  }, [token.id, token.url]);

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex>
            <Heading flexGrow={1}>Edit Token</Heading>
            <ThingPreview url={token.url} />
          </Flex>
        </ModalHeader>
        <ModalBody>
          <TokenFields token={token} setToken={onUpdate} />
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button onClick={onClickCancel}>Cancel</Button>
            <Button
              colorScheme="green"
              disabled={isInvalid}
              onClick={onClickOK}
            >
              OK
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
