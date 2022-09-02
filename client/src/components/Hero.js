import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import hero from "../hero.jpg";
import { updateFN } from "../features/userR";

function Hero(props) {
  //reset the scores when the hero is rendered
  props.reset();
  //add user updateFN to update the user State to get the name of the user
  const dispatch = useDispatch();
  const changeUserState = (e) => {
    dispatch(updateFN(e.target.value));
  };
  return (
    <section className="hero">
      <div className="hero-container">
        <img src={hero} alt={"hero"} />
      </div>

      <div className="student-info">
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" onChange={changeUserState} />
        </div>
        <div className="student-actions">
          <Link to="/exam" className="btn">
            Enter the Exam
          </Link>
          <Link to="my-scores" className="btn">
            Review
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
