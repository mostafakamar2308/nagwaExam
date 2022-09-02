import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import axios from "axios";
import { Link } from "react-router-dom";

function Rank(props) {
  //get the user name to display it
  const user = useSelector((state) => state.user);
  const [scoreState, setScoreState] = useState({
    rank: 0,
    list: [],
  });
  const [scoreRec, setScoreRec] = useState([]);
  //get the score of the user and its rank
  useEffect(() => {
    console.log(props.score.length);
    axios.get(`/api/rank/${props.score.length * 10}`).then((res) => {
      setScoreState({ rank: res.data.rank, list: res.data.list });
    });
  }, [props.score.length]);

  //get the score list to then checks if it's populated then call getEle FN
  useEffect(() => {
    if (scoreState.list.length !== 0) {
      let arr = [];
      for (let i = 0; i < 110; i += 10) {
        arr.push(getEle(i));
      }
      setScoreRec(arr);
    }
  }, [scoreState.list.length]);

  //FN to get the recurrence of each answer of other student to make a graph out of it
  const getEle = (score) => {
    let recurrence = scoreState.list.filter((ele) => ele === score).length;
    return { number: score, rec: recurrence };
  };

  return (
    <section className="rank-section">
      <div>
        <strong>Congratulations {user}</strong>
        <div>
          You are above <strong>{scoreState.rank}%</strong> of your class
        </div>
      </div>
      <div className="chart">
        {scoreRec.map((ele) => {
          //make a graph of marks from 0- 100 and remove any degree that isn't there
          if (ele.rec === 0) return;

          return (
            <div
              className={
                (props.score.length * 10 === ele.number ? "myScore" : "") +
                " bar"
              }
              style={{
                height: `${(ele.rec / 10) * 100 + 10}%`,
              }}
            >
              {ele.number}
            </div>
          );
        })}
      </div>
      {/* Try again btn to get to the exam page */}
      <Link to="/exam" className="btn">
        Try Again?
      </Link>
    </section>
  );
}

export default Rank;
