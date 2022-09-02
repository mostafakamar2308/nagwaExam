import React, { useEffect, useState } from "react";
import axios from "axios";
function MyScores() {
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
        <div>Perfect My Man</div>
      )}
    </div>
  );
}

export default MyScores;
