import React from "react";
import { connect } from "react-redux";
import { newGame } from "../actions";
import "./ButtonCard.css";

const ButtonCard = props => {
	return (
		<div className="button-card" onClick={props.newGame}>
			<div>New game</div>
			<div>
				<i className="play icon" />
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {};
};

export default connect(
	mapStateToProps,
	{ newGame }
)(ButtonCard);
