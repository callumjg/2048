import React from "react";
import "./Tile.css";

const Tile = ({ value, row, col }) => {
	return (
		<div
			className={`tile tile-position-${row}-${col} tile-${
				value <= 2048 ? value : "plus"
			}`}>
			<p>{value}</p>
		</div>
	);
};

export default Tile;
