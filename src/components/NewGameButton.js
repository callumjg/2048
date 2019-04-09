import React from "react";
import { connect } from "react-redux";
import { newGame } from "../actions";
import "./NewGameButton.css";

const NewGameButton = props => {
	return (
		<div className="new-game-button" onClick={props.newGame}>
			<div>New game</div>
			<div>
				<i className="play icon" />
			</div>
		</div>
	);
};

export default connect(
	null,
	{ newGame }
)(NewGameButton);
