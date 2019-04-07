import React from "react";
import { connect } from "react-redux";
import ScoreCard from "./ScoreCard";
import "./Header.css";

const Header = props => {
	const { score } = props;
	return (
		<div className="header">
			<div className="title">2048</div>
			<ScoreCard title="SCORE" points={score.current} />
			<ScoreCard title="BEST" points={score.best} />
		</div>
	);
};

const mapStateToProps = state => {
	return {
		score: state.score
	};
};

export default connect(mapStateToProps)(Header);
