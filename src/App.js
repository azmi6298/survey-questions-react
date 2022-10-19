import "./App.css";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";

import CardList from "./components/CardList";
import AlertDelete from "./components/AlertDelete";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [questionList, setQuestionList] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);

  const options = ["May Select", "Must Select"];

  // initial render to set question list
  const fetchQuestionList = () => {
    return JSON.parse(localStorage.getItem("questionList"));
  };

  useEffect(() => {
    setSelectedOption(options[0]);
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
  const handleOpenDialog = (e, id) => {
    e.preventDefault();
    setTargetId(id);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // CRUD handler
  const handleSave = (e) => {
    e.preventDefault();
    const questionElem = {
      id: Date.now(),
      question,
      selectedOption,
      answer,
    };

    setQuestionList((prev) => [...prev, questionElem]);

    setAnswer("");
    setQuestion("");
    setSelectedOption(options[0]);
  };

  const handleEdit = (id) => {
    console.log("edit");
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

      <span>Input question</span>

      <TextField
        id="question"
        label="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        multiline
        rows={4}
        variant="filled"
      />

      <span>Respondent option</span>
      <Select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {options.map((opt, i) => (
          <MenuItem value={opt} key={i}>
            {opt}
          </MenuItem>
        ))}
      </Select>

      <span>Input answer</span>
      <TextField
        id="answer"
        label="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        multiline
        rows={4}
        variant="filled"
      />

      <Button onClick={(e) => handleSave(e)} variant="contained">
        Save
      </Button>
    </Stack>
  );
}

export default App;
