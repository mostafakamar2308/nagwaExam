import React, { useEffect, useState } from "react";
import Question from "./Question";
const axios = require("axios");

function Exam() {
  const [wordList, setWordList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  useEffect(() => {
    axios
      .get("/api/words")
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .then((res) => setWordList(res));
  }, []);

  const checkAnswer = (id, answer) => {
    try {
      axios
        .post(`/api/answer/${id}`, { answer: answer })
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .then((res) => {
          if (res.selectedAnswer === res.correctAnswer) {
            console.log(true);
          } else {
            console.log(false);
          }
        })
        .then(() => {
          currentQuestion < 10
            ? setCurrentQuestion((prevState) => prevState + 1)
            : console.log("Finished Questions");
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div className="progress-bar"></div>
      <div className="exam-question">
        {wordList &&
          wordList.map(
            (ele, index) =>
              index === currentQuestion && (
                <Question
                  key={index}
                  word={ele.word}
                  id={ele.id}
                  handleAnswer={checkAnswer}
                />
              )
          )}
      </div>
    </div>
  );
}

export default Exam;
