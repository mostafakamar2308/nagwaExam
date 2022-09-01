import "./App.css";
import logo from "./logo.png";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import Exam from "./components/Exam";
import Rank from "./components/Rank";
import MyScores from "./components/MyScores";

function App() {
  return (
    <div className="App">
      <Router>
        <header className="header">
          <Link to="/">
            <img src={logo} height={100} alt="Nagwa-Logo" />
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/rank" element={<Rank />} />
          <Route path="/my-scores" element={<MyScores />} />
          <Route path="/exam" element={<Exam />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
