import React from "react";
import { connect } from "react-redux";
import { openTutorial } from "../actions";
import "./button-control.css";

const TutorialButton = ({ openTutorial }) => {
	return (
		<div className="button-control" onClick={openTutorial}>
			<p>How to play</p>
		</div>
	);
};

export default connect(
	null,
	{ openTutorial }
)(TutorialButton);
