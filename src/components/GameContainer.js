import React from "react";
import "./GameContainer.css";
import TileBoard from "./TileBoard";
import Tile from "./Tile";

class GameContainer extends React.Component {
	render() {
		const tiles = this.props.tiles.map(tile => {
			return (
				<Tile
					key={tile.key}
					row={tile.y}
					col={tile.x}
					value={tile.value}
				/>
			);
		});
		return (
			<div className="game-container">
				<div className="tile-container">
					<TileBoard />
					{tiles}
				</div>
			</div>
		);
	}
}

export default GameContainer;
