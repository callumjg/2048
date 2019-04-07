import React from "react";
import { connect } from "react-redux";
import TileBoard from "./TileBoard";
import Header from "./Header";
import { handleSwipe } from "../utilities";
import { moveTiles, addRandomTile, addGameOverTiles } from "../actions";

import "./App.css";

class App extends React.Component {
	componentDidMount() {
		document.addEventListener("keydown", this.onInput.bind(this));
		handleSwipe(document, this.props.moveTiles);

		this.keyRouting = {
			ArrowDown: () => this.props.moveTiles("down"),
			ArrowUp: () => this.props.moveTiles("up"),
			ArrowLeft: () => this.props.moveTiles("left"),
			ArrowRight: () => this.props.moveTiles("right")
		};

		this.props.addRandomTile(2);
		// this.props.addGameOverTiles();
	}

	onInput(e) {
		let key = "";
		if (e.type === "keydown" && e.key !== "Shift") {
			key = e.key;
		}
		try {
			if (this.keyRouting[key]) {
				e.preventDefault();
				this.keyRouting[key]();
			}
		} catch (err) {
			console.log(err);
			this.setState({ msg: err.message });
		}
	}

	render() {
		return (
			<div className="app-container">
				<Header />
				<TileBoard />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		tiles: state.tiles
	};
};

export default connect(
	mapStateToProps,
	{ moveTiles, addRandomTile, addGameOverTiles }
)(App);
