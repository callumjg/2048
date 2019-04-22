import React from "react";
import { connect } from "react-redux";
import { closeTutorial } from "../actions";
import "./Tutorial.css";
import "./Tile.css";

const Tutorial = props => {
	const getContent = () => {
		return !props.isTutorialOpen ? null : (
			<div className="tutorial-container" onClick={props.closeTutorial}>
				<div className="tutorial">
					<h1>How to play</h1>
					<div className="item">
						1. Swipe <i className="hand point right outline icon" />
						or press{" "}
						<i className="arrow alternate circle left icon" />
						<i className="arrow alternate circle up icon" />
						<i className="arrow alternate circle right icon" />
						<i className="arrow alternate circle down icon" />
						to combine tiles of the same value.
					</div>
					<div className="item">
						2. Win by getting to{" "}
						<span style={{ display: "inline-block" }}>
							<div
								className="tile tile-2048"
								style={{
									position: "relative",
									width: "45px",
									height: "45px",
									fontSize: "16pt"
								}}>
								<p>2048</p>
							</div>
						</span>
					</div>
					<div className="item">
						3. Lose if there are no more possible moves.
					</div>
					<div className="close">
						<span>Close</span>
						<i className="close alternate circle left icon" />
					</div>
				</div>
			</div>
		);
	};
	return getContent();
};

const mapStateToProps = state => {
	return {
		isTutorialOpen: state.isTutorialOpen
	};
};
export default connect(
	mapStateToProps,
	{ closeTutorial }
)(Tutorial);
