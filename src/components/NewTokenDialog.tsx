import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";

import ThingPreview from "./ThingPreview";
import Token from "../types/Token";
import TokenFields from "./TokenFields";
import { addToken } from "../store/slices/tokens";
import { closeDialog } from "../store/slices/app";
import { useAppDispatch } from "../store/hooks";
import { v4 } from "uuid";

type Props = { x: number; y: number };

export default function NewTokenDialog({ x, y }: Props) {
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
            <Heading flexGrow={1}>New Token</Heading>
            <ThingPreview url={token.url} />
          </Flex>
        </ModalHeader>
        <ModalBody>
          <TokenFields isNew token={token} setToken={setToken} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" disabled={isInvalid} onClick={onClickOK}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
