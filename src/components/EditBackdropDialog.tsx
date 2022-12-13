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

import Backdrop from "../types/Backdrop";
import BackdropFields from "./BackdropFields";
import ThingPreview from "./ThingPreview";
import { closeDialog } from "../store/slices/app";
import { selectBackdropDictionary } from "../store/selectors";
import { updateBackdrop } from "../store/slices/backdrops";
import { useEffectOnce } from "react-use";

type Props = { id: Backdrop["id"] };

export default function EditBackdropDialog({ id }: Props) {
  const dispatch = useAppDispatch();
  const backdrops = useAppSelector(selectBackdropDictionary);
  const [original, setOriginal] = useState<Backdrop>({
    id: "",
    url: "",
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  });
  const [backdrop, setBackdrop] = useState<Backdrop>({
    id: "",
    url: "",
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  });

  useEffectOnce(() => {
    const old = backdrops[id];
    if (old) {
      setOriginal(old);
      setBackdrop(old);
    }
  });

  const onUpdate = useCallback(
    (act: SetStateAction<Backdrop>) => {
      const value = typeof act === "function" ? act(backdrop) : act;
      setBackdrop(value);
      dispatch(updateBackdrop({ id, changes: value }));
    },
    [backdrop, dispatch, id]
  );

  const onClickOK = useCallback(() => {
    dispatch(closeDialog());
  }, [dispatch]);

  const onClickCancel = useCallback(() => {
    dispatch(updateBackdrop({ id, changes: original }));
    dispatch(closeDialog());
  }, [dispatch, id, original]);

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
            <Heading flexGrow={1}>Edit Backdrop</Heading>
            <ThingPreview url={backdrop.url} />
          </Flex>
        </ModalHeader>
        <ModalBody>
          <BackdropFields backdrop={backdrop} setBackdrop={onUpdate} />
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
