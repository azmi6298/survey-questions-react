import "./App.css";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";

import CardList from "./components/CardList";
import ModalDelete from "./components/ModalDelete";
import ModalEdit from "./components/ModalEdit";
import QuestionForm from "./components/QuestionForm";

function App() {
  const [questionList, setQuestionList] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);

  // initial render to set question list
  const fetchQuestionList = () => {
    return JSON.parse(localStorage.getItem("questionList"));
  };

  useEffect(() => {
    const list = fetchQuestionList();

    return () => {
      if (list) {
        setQuestionList(list);
      }
    };
  }, []);

  // trigger save question if question list changed
  const stringifiedArr = JSON.stringify(questionList);
  useEffect(() => {
    localStorage.setItem("questionList", JSON.stringify(questionList));
  }, [stringifiedArr]);

  // handle dialog before delete data
  const handleOpenModal = (modalType, id) => {
    setTargetId(id);
    setModalType(modalType);
    setisModalOpen(true);
  };

  const handleCloseModal = () => {
    setisModalOpen(false);
  };

  // CRUD handler
  const handleSave = (formData) => {
    const questionElem = {
      id: Date.now(),
      question: formData.question,
      selectedOption: formData.selectedOption,
      answer: formData.answer,
    };

    setQuestionList((prev) => [...prev, questionElem]);
  };

  const handleEdit = () => {
    console.log("====================================");
    console.log("edit");
    console.log("====================================");
    if (targetId) {
      const targetObj = questionList.find((obj) => obj.id === targetId);
      console.log(targetObj);
    }
  };

  const handleDelete = () => {
    if (targetId) {
      const listClone = [...questionList];
      const filteredList = listClone.filter((obj) => obj.id !== targetId);
      setQuestionList(filteredList);
      setisModalOpen(false);
    }
  };

  const isModalEdit = () => {
    return modalType == "edit";
  };

  return (
    <Stack spacing={2} className="container">
      {isModalEdit() ? (
        <ModalEdit
          isModalOpen={isModalOpen}
          onCloseModal={handleCloseModal}
          onSave={handleEdit}
          formData={questionList.find((obj) => obj.id === targetId)}
        />
      ) : (
        <ModalDelete
          isModalOpen={isModalOpen}
          onCloseModal={handleCloseModal}
          onDelete={handleDelete}
          formData={questionList.find((obj) => obj.id === targetId)}
        />
      )}

      <span>Question list</span>

      {questionList.length ? (
        <CardList
          listData={questionList}
          onReorder={setQuestionList}
          onOpenModal={handleOpenModal}
        />
      ) : (
        <span style={{ color: "gray" }}>Question list is empty</span>
      )}

      <QuestionForm onSubmit={handleSave} />
    </Stack>
  );
}

export default App;
