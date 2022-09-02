import "./App.css";
import logo from "./logo.png";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import Exam from "./components/Exam";
import { useState } from "react";
import Rank from "./components/Rank";
import MyScores from "./components/MyScores";

function App() {
  const [score, setScore] = useState([]);
  const reset = () => {
    score.length > 0 && setScore([]);
  };

  const changeScore = () => {
    setScore((prev) => [...prev, true]);
  };
  return (
    <div className="App">
      <Router>
        <header className="header">
          <Link to="/">
            <img src={logo} height={100} alt="Nagwa-Logo" />
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<Hero reset={reset} />} />
          <Route path="/rank" element={<Rank score={score} />} />
          <Route path="/my-scores" element={<MyScores />} />
          <Route
            path="/exam"
            element={
              <Exam handleScores={changeScore} score={score} reset={reset} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
