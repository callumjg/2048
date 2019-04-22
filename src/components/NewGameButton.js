import React from "react";
import { connect } from "react-redux";
import { newGame } from "../actions";
import "./button-control.css";

const NewGameButton = ({ newGame }) => {
	return (
		<div className="button-control" onClick={newGame}>
			<div>
				<i className="play small icon" />
				<p>New Game</p>
			</div>
		</div>
	);
};

export default connect(
	null,
	{ newGame }
)(NewGameButton);
