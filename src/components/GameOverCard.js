import React from "react";
import { connect } from "react-redux";
import { TransitionMotion, spring } from "react-motion";
import NewGameButton from "./NewGameButton";
import "./GameOverCard.css";

const GameOverCard = props => {
	const contentArr = props.isGameOver ? [{}] : [],
		willLeave = () => {
			return { opacity: spring(0) };
		},
		willEnter = () => {
			return {
				opacity: 0
			};
		},
		getStyles = () =>
			contentArr.map(item => {
				return {
					key: "main",
					style: { opacity: spring(1, { stiffness: 55 }) }
				};
			}),
		getChildren = styles => (
			<React.Fragment>
				{styles.map(config => {
					return (
						<div
							key={config.key}
							className="game-over-card"
							style={{ ...config.style }}>
							<h1>Game Over</h1>
							<NewGameButton />
						</div>
					);
				})}
			</React.Fragment>
		);

	return (
		<TransitionMotion
			willLeave={willLeave}
			willEnter={willEnter}
			styles={getStyles()}>
			{getChildren}
		</TransitionMotion>
	);
};
const mapStateToProps = ({ isGameOver }) => {
	return { isGameOver };
};
export default connect(mapStateToProps)(GameOverCard);
