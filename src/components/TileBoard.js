import React from "react";
import "./TileBoard.css";

const TileBoard = props => {
	const getDivs = () =>
		Array(16)
			.fill(null)
			.map((tile, index) => <div key={index} />);
	return <div className="tile-board">{getDivs()}</div>;
};

export default TileBoard;
