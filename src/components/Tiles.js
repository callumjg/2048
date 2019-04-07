import React from "react";
import { connect } from "react-redux";
import { TransitionMotion, spring } from "react-motion";
import Tile from "./Tile";

class Tiles extends React.Component {
	state = { windowSize: window.innerWidth };

	componentDidMount() {
		window.addEventListener("resize", () => {
			const { windowSize } = this.state;
			if (
				(windowSize > 500 && window.innerWidth <= 500) ||
				(windowSize <= 500 && window.innerWidth > 500)
			)
				this.setState({ windowSize: window.innerWidth });
		});
	}

	willLeave = () => {
		return {
			opacity: spring(0, {
				precision: 0.1,
				stiffness: 250,
				damping: 20
			})
		};
	};

	willEnter = () => {
		return { opacity: 0, height: 0, width: 0 };
	};

	getTileStyle = () =>
		this.props.tiles.map(tile => {
			return {
				key: tile.key.toString(),
				style: {
					opacity: spring(1, {
						precision: 0.1,
						stiffness: 150,
						damping: 20
					}),
					width: spring(1, { precision: 0.1, stiffness: 120 })
				},
				data: {
					value: tile.value,
					x: tile.x,
					y: tile.y
				}
			};
		});

	getChildren = interpolatedStyles => {
		return (
			<React.Fragment>
				{interpolatedStyles.map(config => {
					return (
						<Tile
							value={config.data.value}
							key={parseInt(config.key)}
							row={config.data.y}
							col={config.data.x}
							width={config.data.width}
							style={{
								...config.style
							}}
						/>
					);
				})}
			</React.Fragment>
		);
	};

	render() {
		return (
			<TransitionMotion
				willEnter={this.willEnter}
				willLeave={this.willLeave}
				styles={this.getTileStyle()}>
				{this.getChildren}
			</TransitionMotion>
		);
	}
}

const mapStateToProps = state => {
	return {
		tiles: state.tiles
	};
};

export default connect(mapStateToProps)(Tiles);
