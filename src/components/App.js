import React from "react";
import GameContainer from "./GameContainer";
import { connect } from "react-redux";
import { moveTiles, addRandomTile } from "../actions";

import "./App.css";

class App extends React.Component {
	componentDidMount() {
		document.addEventListener("keydown", this.onInput.bind(this));
		this.keyRouting = {
			ArrowDown: () => this.props.moveTiles("down"),
			ArrowUp: () => this.props.moveTiles("up"),
			ArrowLeft: () => this.props.moveTiles("left"),
			ArrowRight: () => this.props.moveTiles("right")
			// a: () => this.props.addRandomTile(2)
		};

		this.props.addRandomTile(2);
	}

	onInput(e) {
		let key = "";
		if (e.type === "keydown" && e.key !== "Shift") {
			key = e.key;
		}
		try {
			if (this.keyRouting[key]) this.keyRouting[key]();
		} catch (err) {
			console.log(err);
			this.setState({ msg: err.message });
		}
	}

	render() {
		return <GameContainer />;
	}
}

const mapStateToProps = state => {
	return {
		tiles: state.tiles
	};
};

export default connect(
	mapStateToProps,
	{ moveTiles, addRandomTile }
)(App);
