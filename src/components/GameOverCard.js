import React from "react";
import ButtonCard from "./ButtonCard";
import { connect } from "react-redux";
import { TransitionMotion, spring } from "react-motion";
import "./GameOverCard.css";

const GameOverCard = props => {
	const contentArr = props.isGameOver ? [{}] : [];
	// const contentArr = [{}];

	return (
		<TransitionMotion
			willLeave={() => {
				return { opacity: spring(0) };
			}}
			willEnter={() => {
				return {
					opacity: 0
				};
			}}
			styles={contentArr.map(item => {
				return {
					key: "main",
					style: { opacity: spring(1, { stiffness: 55 }) }
				};
			})}>
			{styles => (
				<React.Fragment>
					{styles.map(config => {
						return (
							<div
								key={config.key}
								className="game-over-card"
								style={{ ...config.style }}>
								<h1>Game Over</h1>
								<ButtonCard />
							</div>
						);
					})}
				</React.Fragment>
			)}
		</TransitionMotion>
	);
};
const mapStateToProps = state => {
	return {
		isGameOver: state.gameOver
	};
};
export default connect(mapStateToProps)(GameOverCard);
