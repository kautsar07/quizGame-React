import React from "react";

export default function Card(props) {
  return (
    <div className="card">
      <div className="card-img">
        <img  src={props.imgUrl} alt="" />

        <div className="description-full">
            <h6>{props.titleQuiz}</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            fuga quasi consequatur error deleniti doloremque, quibusdam animi,
            nobis tempore omnis, accusantium a ad eveniet laboriosam! Deleniti,
            similique exercitationem! Atque odio culpa quisquam ea deleniti
            aperiam. Perspiciatis debitis quo incidunt blanditiis harum
            consequuntur officia! Minima assumenda, voluptatum laudantium
            recusandae rerum animi.
          </p>
        </div>
      </div>
      <div className="wrap-desc">
        <h6>{props.titleQuiz}</h6>
        <div className="desc">
          <div className="text">
            <p>{props.desc}</p>
          </div>
        </div>

        <div className="btn-go">
          <button onClick={props.typeQuiz}>Go</button>
        </div>
      </div>
    </div>
  );
}
