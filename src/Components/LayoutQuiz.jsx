import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Countdown from "react-countdown";
import axios from "axios";
import "./LayoutQuiz.css";

export default function LayoutQuiz() {
  const [start, setStart] = useState(false);
  const [easy, setEasy] = useState([]);
  const Completionist = () => <span>You are good to go!</span>;
  const renderer = ({ seconds, completed }) => {
    if (completed) {
      setStart(false);
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
      const easys = await axios.get(
        `https://opentdb.com/api.php?amount=6&category=27&difficulty=easy&type=multiple`
      );
      //   const medium = await axios.get(
      //     `https://opentdb.com/api.php?amount=6&category=27&difficulty=medium&type=multiple`
      //   );
      //   const hard = await axios.get(
      //     `https://opentdb.com/api.php?amount=6&category=27&difficulty=hard&type=multiple`
      //   );
      setEasy(easys.data.results);
    } catch (error) {
      console.error(error);
    }
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
            <h1>Quiz Art</h1>
          </div>
          {start ? null : (
            <div className="start">
              <button onClick={() => setStart(true)}>Start</button>
            </div>
          )}
          {start ? (
            <Countdown date={Date.now() + 60000} renderer={renderer} />
          ) : null}
          {easy.map((item) => (
            <div className="wrap-question-answer">
              <div className="question">
                <p>{item.question}</p>
              </div>
              <div className="answer">
                {item.incorrect_answers.map((item) => (
                  <button onClick={()=>console.log(item)}>{item}</button>
                ))}
                <button onClick={()=>console.log(item.correct_answer)}>{item.correct_answer}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
