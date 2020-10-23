import React from "react";
import { connect } from "react-redux";
import { newGame } from "../actions";
import "./button-control.css";

const NewGameButton = ({ newGame }) => (
  <div className="button-control" onClick={newGame}>
    <div>
      <span>
        <i className="play small icon" />
      </span>
      <p>New Game</p>
    </div>
  </div>
);

export default connect(null, { newGame })(NewGameButton);
