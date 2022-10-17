import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [questionList, setQuestionList] = useState([]);

  const options = ["May Select", "Must Select"];

  // initial render to set question list
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

  const handleEdit = (e, id) => {
    e.preventDefault();
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    const listClone = [...questionList];
    const filteredList = listClone.filter((obj) => obj.id !== id);
    setQuestionList(filteredList);
  };

  const fetchQuestionList = () => {
    return JSON.parse(localStorage.getItem("questionList"));
  };

  return (
    <div className="container">
      <span>Question list</span>
      {questionList?.map((q, i) => (
        <div
          key={q.id}
          style={{
            display: "flex",
            flexDirection: "column",
            border: "white solid 1px",
          }}
        >
          <span>q: {q.question}</span>
          <span>a: {q.answer}</span>
          <span>o: {q.selectedOption}</span>

          <button onClick={(e) => handleEdit(e, q.id)}>Edit</button>
          <button onClick={(e) => handleDelete(e, q.id)}>Delete</button>
        </div>
      ))}
      <span>Input question</span>
      <textarea
        value={question}
        placeholder="Input question..."
        onChange={(e) => setQuestion(e.target.value)}
      ></textarea>

      <span>{question}</span>

      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {options.map((opt, i) => (
          <option value={opt} key={i}>
            {opt}
          </option>
        ))}
      </select>
      <textarea
        value={answer}
        placeholder="Input answer..."
        onChange={(e) => setAnswer(e.target.value)}
      ></textarea>

      <span>selected option: {selectedOption}</span>
      <span>{answer}</span>

      <button onClick={(e) => handleSave(e)}>Save</button>
    </div>
  );
}

export default App;
