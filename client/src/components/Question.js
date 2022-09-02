import axios from "axios";
import React, { useState } from "react";

function Question(props) {
  //make a feedback state to store the current question state: answered correctly or wrong
  const [feedBack, setFeedBack] = useState("");
  //get the correct answer from the server then compare it to the answer user has given
  const getFeedBack = (questionId, id) => {
    axios
      .post(`/api/answer/${questionId}`, { answer: id })
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.selectedAnswer === res.correctAnswer) {
          setFeedBack(true);
        } else {
          setFeedBack(false);
        }
      });
  };
  //the question component consists of the word and 4 buttons each has its own id which is given to the handle answer function which evaluate it
  return (
    <div className="question">
      <h2>{props.word.toUpperCase()}</h2>
      <div className="question-choices">
        <button
          className="btn"
          id="noun"
          onClick={(e) => {
            props.handleAnswer(props.id, e.target.id);
            getFeedBack(props.id, e.target.id);
          }}
        >
          Noun
        </button>
        <button
          className="btn"
          id="adverb"
          onClick={(e) => {
            props.handleAnswer(props.id, e.target.id);
            getFeedBack(props.id, e.target.id);
          }}
        >
          Adverb
        </button>
        <button
          className="btn"
          id="verb"
          onClick={(e) => {
            props.handleAnswer(props.id, e.target.id);
            getFeedBack(props.id, e.target.id);
          }}
        >
          Verb
        </button>
        <button
          className="btn"
          id="adjective"
          onClick={(e) => {
            props.handleAnswer(props.id, e.target.id);
            getFeedBack(props.id, e.target.id);
          }}
        >
          Adjective
        </button>
      </div>
      {/*TODO:  Handle Feed back */}
      <div className="feedBack">
        {feedBack === "" ? (
          <span>...</span>
        ) : (
          <>
            {feedBack === true ? (
              <div className="true-feedback">True</div>
            ) : (
              <div className="false-feedback">False</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Question;
