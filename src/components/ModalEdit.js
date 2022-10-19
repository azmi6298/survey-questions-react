import QuestionForm from "./QuestionForm";
import ModalComponent from "./ModalComponent";

export default function ModalEdit({
  isModalOpen,
  onCloseModal,
  onSave,
  formData,
}) {
  return (
    <ModalComponent
      isModalOpen={isModalOpen}
      isEditModal={true}
      modalContent={<QuestionForm initialData={formData} />}
      onCloseModal={onCloseModal}
    />
  );
}
