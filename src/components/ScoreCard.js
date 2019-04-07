import React from "react";

import "./ScoreCard.css";
const ScoreCard = props => {
	const { title, points } = props;
	return (
		<div className="score-card">
			<div>{title}</div>
			<div className="points">{points}</div>
		</div>
	);
};

export default ScoreCard;
