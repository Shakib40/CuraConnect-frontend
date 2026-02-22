import {
  Modal as FlowbiteModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "flowbite-react";

const Modal = ({ show, onClose, title, children, footer, size = "md" }) => {
  return (
    <FlowbiteModal show={show} onClose={onClose} size={size} popup={false}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      {footer && (
        <ModalFooter className="flex justify-end gap-3">{footer}</ModalFooter>
      )}
    </FlowbiteModal>
  );
};

export default Modal;
