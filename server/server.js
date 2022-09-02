//Initialize the express App
const express = require("express");
const app = express();

//Get the testData Json File
const testData = require("./TestData.json");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//make an endpoint for the words
app.get("/api/words", (req, res) => {
  //get 10 words from the array
  let shuffeledArray = testData.wordList.sort(() => Math.random() - 0.5);
  let finalArr = shuffeledArray.slice(0, 10);
  //   console.log(finalArr.length);
  res.json(finalArr);
});
app.post("/api/answer/:id", (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;
  let word = testData.wordList.find((ele) => ele.id === Number(id));

  res.json({ correctAnswer: word.pos, selectedAnswer: answer });
});

//make an endpoint for the rank system
app.get("/api/rank/:score", (req, res) => {
  //get the score of the user then get the scorelist
  //filter the scorelist to show scores that is below the score of the current user
  const { score } = req.params;
  let scoreList = testData.scoresList;
  let newScoreList = scoreList.filter((ele) => ele < score);
  //calculate the rank of the user and send it
  let rank = (newScoreList.length / scoreList.length) * 100;
  console.log(rank);
  res.json({ rank: rank, list: scoreList });
});

app.listen(5000, () => {
  console.log("Server Running on PORT 5000");
});
