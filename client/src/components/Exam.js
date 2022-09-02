import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Question from "./Question";
const axios = require("axios");

function Exam(props) {
  useEffect(() => {
    props.reset();
  }, []);
  const [wordList, setWordList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  useEffect(() => {
    axios
      .get("/api/words")
      .then((res) => {
        return res.data;
      })
      .then((res) => setWordList(res));
  }, []);

  const checkAnswer = (id, answer) => {
    try {
      axios
        .post(`/api/answer/${id}`, { answer: answer })
        .then((res) => {
          return res.data;
        })
        .then((res) => {
          if (res.selectedAnswer === res.correctAnswer) {
            props.handleScores();
          } else {
            console.log(false);
          }
        })
        .then(() => {
          setTimeout(() => {
            currentQuestion < 10
              ? setCurrentQuestion((prevState) => prevState + 1)
              : console.log("Finished Questions");
          }, 1300);
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <section>
      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${(currentQuestion / 10) * 100}%`,
          }}
        ></div>
      </div>
      {currentQuestion < 10 ? (
        <>
          <div className="question-number">
            <p>Question {currentQuestion + 1}:</p>
          </div>
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
        </>
      ) : (
        <div className="finish">
          <div>You finished your exam :D</div>
          <h2>
            Your Score is <span>{(props.score.length / 10) * 100} %</span>
          </h2>
          <Link className="btn" to="/rank">
            See Your Rank
          </Link>
        </div>
      )}
    </section>
  );
}

export default Exam;
