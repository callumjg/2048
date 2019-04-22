import React from "react";
import NewGameButton from "./NewGameButton";
import TutorialButton from "./TutorialButton";

import "./GameControls.css";

const GameControls = props => {
	return (
		<div className="game-controls">
			<NewGameButton />
			<TutorialButton />
		</div>
	);
};

export default GameControls;
