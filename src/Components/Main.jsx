import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import "./Main.css";

export default function Main() {
  const navigate = useNavigate()
  const category = [
    {
      Category: "ART",
      imgUrl:
        "https://images.pexels.com/photos/3660035/pexels-photo-3660035.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      Category: "ANIMALS",
      imgUrl:
        "https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      Category: "HISTORY",
      imgUrl:
        "https://images.pexels.com/photos/3199399/pexels-photo-3199399.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];
  return (
    <div className="container">
      <div className="wrap-main">
        <div className="quiz">
          <h1>Category Quiz</h1>
        </div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam,
          similique cupiditate accusantium temporibus corrupti eaque tenetur
          nihil beatae reiciendis labore pariatur asperiores consequuntur
          inventore libero vitae nobis. Veniam numquam et blanditiis, quasi,
          voluptatum eos laborum culpa explicabo distinctio eligendi dolorem
          voluptas aspernatur rerum facilis corporis aperiam eius cum quidem
          beatae?
        </p>
        <div className="category">
          {category.map((item) => (
            <Card
              imgUrl={item.imgUrl}
              titleQuiz={item.Category}
              desc={
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Distinctio, eligendi.
                </p>
              
              }
                typeQuiz={()=>navigate(`/${item.Category.toLocaleLowerCase()}/${item.Category}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
