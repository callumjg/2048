const getCurrentTileMap = tiles => {
	const tileMap = [
		[null, null, null, null],
		[null, null, null, null],
		[null, null, null, null],
		[null, null, null, null]
	];
	tiles.forEach(({ y, x, value }) => (tileMap[y][x] = value));

	return tileMap;
};

let tileKeyCounter = 0;

export const moveTiles = direction => (dispatch, getState) => {
	const tiles = getState().tiles,
		currentTileMap = getCurrentTileMap(tiles);

	const isMerged = [
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false]
	];

	let yBump = 0,
		xBump = 0,
		axis,
		sortFunction,
		reverse,
		hasMoved = false;

	switch (direction) {
		case "down":
			yBump++;
			sortFunction = (a, b) => b.y - a.y; //sortDown
			axis = "y";
			reverse = false;

			break;
		case "up":
			yBump--;
			sortFunction = (a, b) => a.y - b.y; //sortUp
			axis = "y";
			reverse = true;

			break;
		case "left":
			xBump--;
			sortFunction = (a, b) => a.x - b.x; //sortLeft
			axis = "x";
			reverse = true;

			break;
		case "right":
			xBump++;
			sortFunction = (a, b) => b.x - a.x;
			axis = "x";
			reverse = false;

			break;
		default:
		// no default
	}

	const orderedTiles = [...tiles].sort(sortFunction);

	const newPositions = orderedTiles.map(tile => {
		const { x, y, value } = tile;

		let thisX = x,
			thisY = y,
			nextX = x + xBump,
			nextY = y + yBump;

		for (
			let i = tile[axis];
			reverse ? i >= 0 : i <= 3;
			reverse ? i-- : i++
		) {
			axis === "x" ? (thisX = i) : (thisY = i);
			if (
				currentTileMap[nextY] === undefined ||
				currentTileMap[nextY][nextX] === undefined ||
				isMerged[nextY][nextX] ||
				(currentTileMap[nextY][nextX] &&
					currentTileMap[nextY][nextX] !== tile.value)
			) {
				currentTileMap[thisY][thisX] = value;
				return { ...tile, y: thisY, x: thisX };
			}
			if (currentTileMap[nextY][nextX] === null) {
				currentTileMap[thisY][thisX] = null;
				hasMoved = true;
				thisY = nextY;
				thisX = nextX;
				nextY += yBump;
				nextX += xBump;

				continue;
			}
			if (currentTileMap[nextY][nextX] === value) {
				currentTileMap[thisY][thisX] = null;
				isMerged[nextY][nextX] = true;
				hasMoved = true;
				currentTileMap[nextY][nextX] += value;
				return { ...tile, y: nextY, x: nextX, value: value * 2 };
			}
		}
	});

	const removedDuplicates = newPositions.filter(tile => {
		let duplicate = !isMerged[tile.y][tile.x];
		isMerged[tile.y][tile.x] = false;
		return duplicate;
	});

	const reOrderedTiles = removedDuplicates.sort((a, b) => a.key - b.key);
	dispatch({ type: "MOVE_TILES", payload: reOrderedTiles });
	if (hasMoved) dispatch(addRandomTile());
	// dispact action
};

export const addTile = tile => {
	return {
		type: "ADD_TILE",
		payload: tile
	};
};

export const addRandomTile = (numOfTiles = 1) => (dispatch, getState) => {
	for (let i = 0; i < numOfTiles; i++) {
		const tiles = getState().tiles,
			newTile = { key: tileKeyCounter++ },
			currentTileMap = getCurrentTileMap(tiles);

		let highestRoll = null;

		// The empty tile with the highest 'roll' is used
		currentTileMap.forEach((row, yIndex) => {
			row.forEach((tile, xIndex) => {
				const roll = Math.random();
				if (!tile && roll > highestRoll) {
					highestRoll = roll;
					newTile.y = yIndex;
					newTile.x = xIndex;
				}
			});
		});

		newTile.value = Math.random() > 0.5 ? 2 : 4;

		if (highestRoll) dispatch({ type: "ADD_TILE", payload: newTile });
	}
};
