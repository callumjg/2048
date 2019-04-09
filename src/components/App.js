import React from "react";
import { connect } from "react-redux";
import TileBoard from "./TileBoard";
import Header from "./Header";
import { handleSwipe } from "../utilities";
import { moveTiles, addRandomTile } from "../actions";
import "./App.css";

class App extends React.Component {
	componentDidMount() {
		const { moveTiles, addRandomTile } = this.props;

		document.addEventListener("keydown", this.onKeyPress.bind(this));
		handleSwipe(document, moveTiles);

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
			<div className="app-container">
				<Header />
				<TileBoard />
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
