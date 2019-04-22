import React from "react";
import { connect } from "react-redux";
import { openTutorial } from "../actions";
import "./button-control.css";

const TutorialButton = ({ openTutorial }) => {
	return (
		<div className="button-control" onClick={openTutorial}>
			<div>
				<span>
					<i className="settings small icon" />
				</span>
				<p>How to play</p>
			</div>
		</div>
	);
};

export default connect(
	null,
	{ openTutorial }
)(TutorialButton);
