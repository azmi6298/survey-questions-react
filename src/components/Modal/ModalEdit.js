import QuestionForm from "../Form/QuestionForm";
import ModalComponent from "./ModalComponent";

export default function ModalEdit({
  isModalOpen,
  onCloseModal,
  onEdit,
  formData,
}) {
  return (
    <ModalComponent
      isModalOpen={isModalOpen}
      isEditModal={true}
      modalContent={<QuestionForm initialData={formData} onEdit={onEdit} />}
      onCloseModal={onCloseModal}
    />
  );
}
