import React from "react";
import { connect } from "react-redux";
import { disableBodyScroll } from "body-scroll-lock";
import TileBoard from "./TileBoard";
import Header from "./Header";
import GameControls from "./GameControls";
import Tutorial from "./Tutorial";
import { handleSwipe } from "../utilities";
import { moveTiles, addRandomTile } from "../actions";
import "./App.css";

class App extends React.Component {
	componentDidMount() {
		const { moveTiles, addRandomTile } = this.props;
		document.addEventListener("keydown", this.onKeyPress.bind(this));
		handleSwipe(document, moveTiles);
		disableBodyScroll(document.querySelector("#app-container"));

		this.keyRouting = {
			ArrowDown: () => moveTiles("down"),
			ArrowUp: () => moveTiles("up"),
			ArrowLeft: () => moveTiles("left"),
			ArrowRight: () => moveTiles("right")
		};

		addRandomTile(2);
	}

	onKeyPress(e) {
		const key = e.type === "keydown" ? e.key : "";
		if (this.keyRouting[key]) {
			e.preventDefault();
			this.keyRouting[key]();
		}
	}

	render() {
		return (
			<div id="app-container">
				<Header />
				<TileBoard />
				<GameControls />
				<Tutorial />
			</div>
		);
	}
}

const mapStateToProps = ({ tiles }) => {
	return { tiles };
};

export default connect(
	mapStateToProps,
	{ moveTiles, addRandomTile }
)(App);
