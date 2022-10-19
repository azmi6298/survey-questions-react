import "./App.css";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";

import CardList from "./components/CardList";
import AlertDelete from "./components/AlertDelete";
import QuestionForm from "./components/QuestionForm";

function App() {
  const [questionList, setQuestionList] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);

  // initial render to set question list
  const fetchQuestionList = () => {
    return JSON.parse(localStorage.getItem("questionList"));
  };

  useEffect(() => {
    // setSelectedOption(options[0]);
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
  const handleOpenDialog = (id) => {
    setTargetId(id);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
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

  const handleEdit = (id) => {
    if (id) {
      const targetObj = questionList.find((obj) => obj.id === id);
      console.log(targetObj);
    }
  };

  const handleDelete = () => {
    if (targetId) {
      const listClone = [...questionList];
      const filteredList = listClone.filter((obj) => obj.id !== targetId);
      setQuestionList(filteredList);
      setIsDialogOpen(false);
    }
  };

  return (
    <Stack spacing={2} style={{ padding: "4rem 8rem" }}>
      <AlertDelete
        isDialogOpen={isDialogOpen}
        onCloseDialog={handleCloseDialog}
        onDelete={handleDelete}
      />

      <span>Question list</span>

      {questionList.length ? (
        <CardList
          listData={questionList}
          onReorder={setQuestionList}
          onEdit={handleEdit}
          onDelete={handleOpenDialog}
        />
      ) : (
        <span style={{ color: "gray" }}>Question list is empty</span>
      )}

      <QuestionForm onSubmit={handleSave} />
    </Stack>
  );
}

export default App;
