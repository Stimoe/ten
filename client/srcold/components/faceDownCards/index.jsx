import React from "react";
import card from "../../cards.json";
import "./style.css";

function FaceDownCards(props) {
  return (
    <div
      onClick={() => {
        props.handleClick(props.currentIndex);
      }}
      id="player-card"
      className={`card grow raise col-md-${props.colSize}`}
    >

      <div className="card-body flip-card-inner nes-pointer">

        <div className="flip-card-front background">
        </div>
        <div className="flip-card-back">
          {/* <div className = "card-corner">
        <h5 className = "card-corne">{props.corner}</h5>
          <img className = "card-image" src={props.cornerImage} alt="Corner Suite"></img>
          </div> */}
          <h5 className="card-title">Mystery Card</h5>
          {/* <p className="card-text">{props.text}</p> */}
        </div>
      </div>
    </div>
  );
}

export default FaceDownCards;