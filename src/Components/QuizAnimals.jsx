import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Countdown from "react-countdown";
import axios from "axios";
import "./LayoutQuiz.css";
import { useParams } from "react-router-dom";

export default function QuizAnimals() {
  const [start, setStart] = useState(false);
  const [easy, setEasy] = useState([]);
  const [medium, setMedium] = useState([]);
  const [hard, setHard] = useState([]);
  const [difficult, setDifficult] = useState([]);
  const [number, setNumber] = useState(0);
  const [color, setColor] = useState(false);
  const [nilai, setNilai] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const { title } = useParams();
  
  const renderer = ({ seconds, completed }) => {
    if (completed) {
      return (
        <div className="wrap-timer">
          <div className="timer">{seconds}s</div>
        </div>
      );
    } else {
      return (
        <div className="wrap-timer">
          <div className="timer">{seconds}s</div>
        </div>
      );
    }
  };

  const loadDrink = async () => {
    try {
      const easy = await axios.get(
        `https://opentdb.com/api.php?amount=6&category=27&difficulty=easy&type=multiple`
      );
      const medium = await axios.get(
        `https://opentdb.com/api.php?amount=6&category=27&difficulty=medium&type=multiple`
      );
      const hard = await axios.get(
        `https://opentdb.com/api.php?amount=6&category=27&difficulty=hard&type=multiple`
      );

      setEasy(easy.data.results);
      setMedium(medium.data.results);
      setHard(hard.data.results);
    } catch (error) {
      console.error(error);
    }
  };
  const handleNumber = (data, i) => {
    console.log(i);
    nilai.push(data)

  
    setNumber(number + 1);
  };
  console.log(nilai);
  const handleStart = (e) => {
    if (e === "Easy") {
      setDifficult(easy);
    } else if (e === "Medium") {
      setDifficult(medium);
    } else {
      setDifficult(hard);
    }
    setStart(true);
  };

  useEffect(() => {
    loadDrink();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="wrap-layout">
          <div className="title-quiz">
            <h1>Quiz {title} </h1>
            {start
              ? difficult
                  .filter((item, i) => i === number)
                  .map((item, i) => (
                    <Countdown date={Date.now() + 3000} renderer={renderer} />
                  ))
              : null}
          </div>
          {start ? null : (
            <div className="difficult">
              <button onClick={() => handleStart("Easy")}>Easy</button>
              <button onClick={() => handleStart("Medium")}>Medium</button>
              <button onClick={() => handleStart("Hard")}>Hard</button>
            </div>
          )}

          {start ? (
            <>
              <div className="number">
                {difficult.map((item, i) => (
                  <button
                    style={
                      correctAnswer === color
                        ? { backgroundColor: "#567189", color: "#fad6a5" }
                        : {
                            backgroundColor: "#fad6a5",
                            color: "#567189",
                          }
                    }
                    onClick={() => setNumber(i, item.incorrect_answers)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              {difficult
                .filter((item, i) => i === number)
                .map((item) => (
                  <div className="wrap-question-answer">
                    <div className="question">
                      <p>{item.question}</p>
                    </div>
                    <div className="answer">
                      {item.incorrect_answers.map((item, i) => (
                        <button
                          style={
                            correctAnswer !== item
                              ? { backgroundColor: "#fad6a5", color: "#567189" }
                              : { backgroundColor: "#567189", color: "#fad6a5" }
                          }
                          onClick={() => handleNumber(item, i)}
                        >
                          {item}
                        </button>
                      ))}
                      <button
                        style={
                          correctAnswer !== item.correct_answer
                            ? { backgroundColor: "#fad6a5", color: "#567189" }
                            : { backgroundColor: "#567189", color: "#fad6a5" }
                        }
                        onClick={() => handleNumber(item.correct_answer, 3)}
                      >
                        {item.correct_answer}
                      </button>
                    </div>
                  </div>
                ))}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
