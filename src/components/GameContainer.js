import React from "react";
import { connect } from "react-redux";
import TileBoard from "./TileBoard";
import Tile from "./Tile";
import "./GameContainer.css";

class GameContainer extends React.Component {
	render() {
		const getTiles = () => {
			return this.props.tiles.map(tile => {
				return (
					<Tile
						key={tile.key}
						row={tile.y}
						col={tile.x}
						value={tile.value}
					/>
				);
			});
		};
		return (
			<div className="game-container">
				<div className="tile-container">
					<TileBoard />
					{getTiles()}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		tiles: state.tiles
	};
};

export default connect(mapStateToProps)(GameContainer);
