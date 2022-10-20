import ModalComponent from "./ModalComponent";

export default function ModalDelete({ isModalOpen, onCloseModal, onDelete }) {
  return (
    <ModalComponent
      isModalOpen={isModalOpen}
      modalTitle={"Are you sure want to delete?"}
      executeTitle={"Delete"}
      onCloseModal={onCloseModal}
      onExecute={onDelete}
    />
  );
}
