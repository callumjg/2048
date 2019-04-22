import React from "react";
import Backdrop from "./Backdrop";
import Tiles from "./Tiles";
import GameOverCard from "./GameOverCard";
import "./TileBoard.css";

const TileBoard = props => {
	return (
		<div className="tile-board">
			<div className="tiles-container">
				<Backdrop />
				<Tiles />
				<GameOverCard />
			</div>
		</div>
	);
};

export default TileBoard;
