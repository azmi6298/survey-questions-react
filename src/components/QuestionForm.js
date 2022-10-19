import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";

import { useState, useEffect } from "react";

export default function QuestionForm({ onSubmit }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const options = ["May Select", "Must Select"];

  useEffect(() => {
    setSelectedOption(options[0]);
  }, []);

  const formData = () => {
    return {
      question,
      selectedOption,
      answer,
    };
  };

  return (
    <Stack style={{ maxWidth: "350px" }} spacing={2}>
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

      <Button onClick={() => onSubmit(formData())} variant="contained">
        Save
      </Button>
    </Stack>
  );
}
