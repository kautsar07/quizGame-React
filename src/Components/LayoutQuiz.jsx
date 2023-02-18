import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Countdown from "react-countdown";
import axios from "axios";
import "./LayoutQuiz.css";
import { useNavigate, useParams } from "react-router-dom";
import ModalScore from "./ModalScore";

export default function QuizHistory() {
  const [start, setStart] = useState(false);
  const [easy, setEasy] = useState([]);
  const [medium, setMedium] = useState([]);
  const [hard, setHard] = useState([]);
  const [difficult, setDifficult] = useState([]);
  const [number, setNumber] = useState(0);
  const [color, setColor] = useState(false);
  const [nilai, setNilai] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timer, setTimer] = useState([number]);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const Title = () => {
    let title;
    if (id === "27") {
      title = "Animals";
      return title;
    } else if (id === "25") {
      title = "Art";
      return title;
    } else {
      title = "History";
      return title;
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const Sss = () => {
    if (number <= 5) {
      return setNumber(number + 1);
    } else {
      return <span>selesai</span>;
    }
  };

  const renderer = ({ seconds, completed }) => {
    let timer = "";
    if (number === 6) {
      setIsModalOpen(true);
    } else {
      for (let i = number; i < difficult.length; i++) {
        // setNumber(number+1)
        return(
        <div key={i} className="wrap-timer">
          <div className="timer">{seconds}s</div>
        </div>)
      }
    }
  };

  const benar = () => {
    let x = [];
    easy.map((item) => x.push(item.correct_answer));
    return x;
  };

  const loadDrink = async () => {
    try {
      const easy = await axios.get(
        `https://opentdb.com/api.php?amount=6&category=${id}&difficulty=easy&type=multiple`
      );
      const medium = await axios.get(
        `https://opentdb.com/api.php?amount=6&category=${id}&difficulty=medium&type=multiple`
      );
      const hard = await axios.get(
        `https://opentdb.com/api.php?amount=6&category=${id}&difficulty=hard&type=multiple`
      );

      setEasy(easy.data.results);
      setMedium(medium.data.results);
      setHard(hard.data.results);
    } catch (error) {
      console.error(error);
    }
  };
  const handleNumber = (data, i, answer) => {
    setNilai(nilai + answer);
    setColor(true);
    setNumber(number + 1);
    timer.push(number+1)
    if (number === 6) {
      setIsModalOpen(true);
    }
  };
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
    benar();
    Title();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="wrap-layout">
          <div className="title-quiz">
            <h1>
              Quiz <Title />{" "}
            </h1>
            {start ? (
              <Countdown date={Date.now() + 10000} renderer={renderer} />
            ) : null}
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
                    key={i}
                    style={
                      color && number === i
                        ? { backgroundColor: "#fad6a5", color: "#567189" }
                        : { backgroundColor: "#567189", color: "#fad6a5" }
                    }
                    onClick={() => setNumber(i, item.incorrect_answers)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              {difficult
                .filter((item, i) => i === number)
                .map((item, i) => (
                  <div key={i} className="wrap-question-answer">
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
                          onClick={() => handleNumber(item, i, 0)}
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
                        onClick={() => handleNumber(item.correct_answer, 3, 1)}
                      >
                        {item.correct_answer}
                      </button>
                    </div>
                  </div>
                ))}
            </>
          ) : null}
        </div>
        <ModalScore
          isModalOpen={isModalOpen}
          handleOk={() => navigate("/")}
          handleCancel={() => navigate("/")}
          length={difficult.length}
          answer={nilai}
        />
      </div>
    </div>
  );
}
