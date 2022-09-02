import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Question from "./Question";
const axios = require("axios");

function Exam(props) {
  //reset the scores for all questions when first rendering the component
  useEffect(() => {
    props.reset();
  }, []);
  // a state containing the words and current question index to decide which question is rendered
  const [wordList, setWordList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  //a request to server to upload the incorrect words with the correct answers to review it later
  const uploadIncorrectAnswer = (word, pos) => {
    axios.post("/api/incorrects", { word, pos });
  };

  //the request to server to get the exam questions then setting the words in the state
  useEffect(() => {
    axios
      .get("/api/words")
      .then((res) => {
        return res.data;
      })
      .then((res) => setWordList(res));
  }, []);

  // function which checks if the user answered correctly
  const checkAnswer = (id, answer) => {
    //give the request the id of the question and the answer given by the user and retrieve the correct answer then evaluate it
    try {
      axios
        .post(`/api/answer/${id}`, { answer: answer })
        .then((res) => {
          return res.data;
        })
        .then((res) => {
          //if the answer is correct, add another element  to the score list
          if (res.selectedAnswer === res.correctAnswer) {
            props.handleScores();
          } else {
            //if the answer is not correct upload the correct answer and the word to server to append it to the problems.json file
            uploadIncorrectAnswer(
              wordList[currentQuestion].word,
              wordList[currentQuestion].pos
            );
          }
        })
        .then(() => {
          //give the user some time to know if he chose the right or wrong answer then move on to the next question
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
          // change the width of the progress bar to indicate the progress of the exams
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
