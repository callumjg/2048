import React from "react";
import "./App.css";
import GameContainer from "./GameContainer";

class App extends React.Component {
	state = {
		tiles: [],

		msg: "This is the message area"
	};

	setAppState = object => {
		this.setState(object);
	};

	componentDidMount() {
		// document.addEventListener("click", this.onInput.bind(this));
		document.addEventListener("keydown", this.onInput.bind(this));
		this.keyRouting = {
			ArrowDown: () => this.onMoveTiles("down"),
			ArrowUp: () => this.onMoveTiles("up"),
			ArrowLeft: () => this.onMoveTiles("left"),
			ArrowRight: () => this.onMoveTiles("right"),
			n: () => this.test()
		};

		this.generateRandomTile();
	}

	generateRandomTile = () => {
		const { tiles } = this.state;

		let tileMap = [
			[null, null, null, null],
			[null, null, null, null],
			[null, null, null, null],
			[null, null, null, null]
		];

		tiles.forEach(tile => {
			tileMap[tile.y][tile.x] = tile.value;
		});

		let twoOrFour = 2;
		if (Math.random() > 0.5) twoOrFour = 4;

		let coord = { y: 0, x: 0 };
		let highestNo = 0;

		tileMap = tileMap.forEach((row, yIndex) => {
			let newRow = row.map((tile, xIndex) => {
				let randNo = Math.random();
				if (!tile && randNo > highestNo) {
					highestNo = randNo;
					coord.y = yIndex;
					coord.x = xIndex;
				}
			});
		});
		let newTile = {
			y: coord.y,
			x: coord.x,
			value: twoOrFour,
			key: this.tileKeyCounter++
		};

		console.table(newTile);

		this.setState({
			tiles: [...tiles, newTile]
		});
	};

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

	test = () => {
		this.setState({
			tiles: [
				{ y: 0, x: 1, value: 2, key: 1 },
				{ y: 3, x: 1, value: 4, key: 2 },
				// { y: 2, x: 1, value: 8 , key: 3},
				{ y: 2, x: 3, value: 16, key: 4 }
			]
		});
	};

	tileKeyCounter = 5;

	onMoveTiles = direction => {
		const { tiles } = this.state;

		let tileMap = [
			[null, null, null, null],
			[null, null, null, null],
			[null, null, null, null],
			[null, null, null, null]
		];

		tiles.forEach(tile => {
			tileMap[tile.y][tile.x] = tile.value;
		});

		let isMerged = [
			[false, false, false, false],
			[false, false, false, false],
			[false, false, false, false],
			[false, false, false, false]
		];

		let yBump = 0;
		let xBump = 0;

		switch (direction) {
			case "down":
				yBump++;
				break;
			case "up":
				yBump--;
				break;
			case "left":
				xBump--;
				break;
			case "right":
				xBump++;
				break;
			default:
			// no default
		}

		const getNewTilePosition = (tile, direction) => {
			const { y, x } = tile;
			let nextTile = { ...tile };

			nextTile.y = y + yBump;
			nextTile.x = x + xBump;

			if (!this.isAdjacentTileFree(tile, direction, tileMap)) {
				return tile;
			}

			if (isMerged[y + yBump][x + xBump] || isMerged[y][x]) {
				return tile;
			}
			if (
				tileMap[y + yBump][x + xBump] &&
				tileMap[y + yBump][x + xBump] !== tileMap[y][x]
			) {
				return tile;
			}

			tileMap[y + yBump][x + xBump] = tile.value;
			tileMap[y][x] = null;

			if (tileMap[y + yBump][x + xBump] === tileMap[y][x]) {
				isMerged[y + yBump][x + xBump] = true;

				return nextTile;
			}

			return getNewTilePosition(nextTile, direction);
		};

		let newTiles = this.orderTilesToGetMoves(tiles, direction);
		newTiles = newTiles.map(tile => getNewTilePosition(tile, direction));

		newTiles = newTiles.map(tile => {
			if (isMerged[tile.y][tile.x]) return;
			return tile;
		});

		this.setState({
			tiles: this.reOrderTiles(newTiles)
		});

		let tilePositions = [];
		let mergedTiles = [];
		newTiles.forEach(tile => {
			if (tilePositions.indexOf(`${tile.y},${tile.x}`) >= 0) {
				mergedTiles.push(tile);
			}
			tilePositions.push(`${tile.y},${tile.x}`);
		});

		mergedTiles.forEach(mergedTile => {
			newTiles = newTiles.filter(tile => {
				return !(tile.y === mergedTile.y && tile.x === mergedTile.x);
			});

			mergedTile.value *= 2;
		});

		this.setState({
			tiles: this.reOrderTiles([...newTiles, ...mergedTiles])
		});

		this.generateRandomTile();
	};

	isAdjacentTileFree = (tile, direction, tileMap) => {
		const { y, x } = tile;

		let adjacentTile = { y: 0, x: 0 };

		switch (direction) {
			case "up":
				if (!tileMap[y - 1]) return false;
				adjacentTile.y = y - 1;
				adjacentTile.x = x;
				break;
			case "down":
				if (!tileMap[y + 1]) return false;
				adjacentTile.y = y + 1;
				adjacentTile.x = x;
				break;
			case "left":
				if (x - 1 < 0) return false;
				adjacentTile.y = y;
				adjacentTile.x = x - 1;
				break;
			case "right":
				// console.log(`tileMap[y].length is ${tileMap[y].length}`);
				// console.log(`x + 1 is ${x + 1}`);
				// console.log(
				// 	`for tile ${
				// 		tile.value
				// 	} check if there is not another col ${!(
				// 		x + 1 <
				// 		tileMap[y].length
				// 	)}`
				// );
				if (!(x + 1 < tileMap[y].length)) {
					// console.log("returning false");
					return false;
				}
				adjacentTile.y = y;
				adjacentTile.x = x + 1;
				break;
			default:
			// no default
		}
		if (
			tileMap[tile.y][tile.x] ===
				tileMap[adjacentTile.y][adjacentTile.x] ||
			!tileMap[adjacentTile.y][adjacentTile.x]
		)
			return true;

		return false;
	};

	orderTilesToGetMoves = (tiles, direction) => {
		return tiles.sort(function(a, b) {
			let yA = a.y;
			let xA = a.x;
			let yB = b.y;
			let xB = b.x;

			switch (direction) {
				case "down":
					if (yA < yB) return 1;
					if (yA > yB) return -1;
					return 0;
					break;
				case "up":
					if (yA < yB) return -1;
					if (yA > yB) return 1;
					return 0;
					break;
				case "left":
					if (xA < xB) return -1;
					if (xA > xB) return 1;
					return 0;
					break;
				case "right":
					if (xA < xB) return 1;
					if (xA > xB) return -1;
					return 0;
					break;
				default:
				// no default
			}
		});
	};

	reOrderTiles = tiles => {
		return tiles.sort(function(a, b) {
			if (a.key > b.key) return 1;
			if (a.key < b.key) return -1;
			return 0;
		});
	};

	render() {
		return (
			<div>
				<div>{this.state.msg}</div>
				<GameContainer tiles={this.state.tiles} />
			</div>
		);
	}
}

export default App;
