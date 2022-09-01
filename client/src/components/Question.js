import React from "react";

function Question(props) {
  return (
    <div className="question">
      <h2>{props.word.toUpperCase()}</h2>
      <div className="question-choices">
        <button
          className="btn"
          id="noun"
          onClick={(e) => props.handleAnswer(props.id, e.target.id)}
        >
          Noun
        </button>
        <button
          className="btn"
          id="adverb"
          onClick={(e) => props.handleAnswer(props.id, e.target.id)}
        >
          Adverb
        </button>
        <button
          className="btn"
          id="verb"
          onClick={(e) => props.handleAnswer(props.id, e.target.id)}
        >
          Verb
        </button>
        <button
          className="btn"
          id="adjective"
          onClick={(e) => props.handleAnswer(props.id, e.target.id)}
        >
          Adjective
        </button>
      </div>
    </div>
  );
}

export default Question;
