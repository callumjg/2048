import React from "react";
import "./Tile.css";

const Tile = ({ value, row, col, style }) => {
	const { opacity, width } = style,
		length = window.innerWidth > 500 ? 105 * width : 63 * width;

	return (
		<div className={`tile tile-position-${row}-${col}`} style={{ opacity }}>
			<div
				className={` tile-${value <= 2048 ? value : "plus"}`}
				style={{
					height: `${length}px`,
					width: `${length}px`
				}}>
				<p>{value}</p>
			</div>
		</div>
	);
};

export default Tile;
