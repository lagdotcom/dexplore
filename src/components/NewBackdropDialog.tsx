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

import Backdrop from "../types/Backdrop";
import BackdropFields from "./BackdropFields";
import ThingPreview from "./ThingPreview";
import { addBackdrop } from "../store/slices/backdrops";
import { closeDialog } from "../store/slices/app";
import { useAppDispatch } from "../store/hooks";
import { v4 } from "uuid";

type Props = { x: number; y: number };

export default function NewBackdropDialog({ x, y }: Props) {
  const dispatch = useAppDispatch();
  const [backdrop, setBackdrop] = useState<Backdrop>({
    id: v4(),
    url: "",
    x,
    y,
    width: 1,
    height: 1,
  });

  const onClickOK = useCallback(() => {
    dispatch(addBackdrop(backdrop));
    dispatch(closeDialog());
  }, [backdrop, dispatch]);

  const onClose = useCallback(() => {
    dispatch(closeDialog());
  }, [dispatch]);

  const isInvalid = useMemo(() => {
    if (!backdrop.id) return true;
    if (!backdrop.url) return true;
  }, [backdrop.id, backdrop.url]);

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex>
            <Heading flexGrow={1}>New Backdrop</Heading>
            <ThingPreview url={backdrop.url} />
          </Flex>
        </ModalHeader>
        <ModalBody>
          <BackdropFields isNew backdrop={backdrop} setBackdrop={setBackdrop} />
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
