import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export type ModalWindowProps = {
  readonly isOpened: boolean;
  readonly onClose: () => void;
  readonly title: string;
};

export const ModalWindow: React.FC<ModalWindowProps> = (props) => (
  <Modal isOpen={props.isOpened} onClose={props.onClose} size="xl">
    <ModalOverlay />
    <ModalContent maxW="site" margin="auto">
      <ModalHeader>{props.title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{props.children}</ModalBody>
      <ModalFooter />
    </ModalContent>
  </Modal>
);
