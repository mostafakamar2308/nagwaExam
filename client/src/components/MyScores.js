import React, { useEffect, useState } from "react";
import axios from "axios";
function MyScores() {
  //get the words which the user answered incorrectly from the server then assign them to state
  const [words, setWords] = useState([]);
  useEffect(() => {
    axios.get("api/incorrects").then((res) => {
      setWords(res.data);
    });
  }, []);
  return (
    <div className="incorrect-words-container">
      {words.length > 0 ? (
        <div>
          {words.map((ele, index) => {
            return (
              <div key={index} className="incorrect-words">
                <p>{ele.word}</p>
                <p>{ele.pos}</p>
              </div>
            );
          })}
        </div>
      ) : (
        //if the user has no incorrect words, then he is a beast.
        <div className="perfect-answers">
          Either you didn't take the exam or You are a beast :D
        </div>
      )}
    </div>
  );
}

export default MyScores;
