import { combineReducers } from "redux";

const tilesReducer = (state = [], action) => {
	switch (action.type) {
		case "ADD_TILE":
			return [...state, action.payload];
		case "MOVE_TILES":
			return action.payload;
		case "NEW_GAME":
			return [];
		case "ADD_GAME_OVER_TILES":
			return [
				{ key: 9991001, value: 2, x: 0, y: 0 },
				{ key: 9991002, value: 4, x: 1, y: 0 },
				{ key: 9991003, value: 8, x: 2, y: 0 },
				{ key: 9991004, value: 16, x: 3, y: 0 },
				{ key: 9991005, value: 32, x: 0, y: 1 },
				{ key: 9991006, value: 64, x: 1, y: 1 },
				{ key: 9991007, value: 128, x: 2, y: 1 },
				{ key: 9991008, value: 256, x: 3, y: 1 },
				{ key: 9991009, value: 512, x: 0, y: 2 },
				{ key: 9991010, value: 1024, x: 1, y: 2 },
				{ key: 9991011, value: 2048, x: 2, y: 2 },
				{ key: 9991012, value: 4096, x: 3, y: 2 },
				{ key: 9991013, value: 8192, x: 0, y: 3 },
				{ key: 9991014, value: 16384, x: 1, y: 3 },
				{ key: 9991015, value: 32768, x: 2, y: 3 },
				{ key: 9991016, value: 65536, x: 3, y: 3 }
			];
		default:
			return state;
	}
};

const scoreReducer = (state = { current: 0, best: 0 }, action) => {
	const { current, best } = state,
		newPoints = current + action.payload;

	switch (action.type) {
		case "ADD_POINTS":
			if (newPoints > best)
				return { current: newPoints, best: newPoints };
			return { current: newPoints, best };
		case "NEW_GAME":
			return { ...state, current: 0 };
		default:
			return state;
	}
};

const gameOverReducer = (state = false, action) => {
	switch (action.type) {
		case "GAME_OVER":
			return true;
		case "NEW_GAME":
			return false;
		default:
			return state;
	}
};
export default combineReducers({
	tiles: tilesReducer,
	score: scoreReducer,
	gameOver: gameOverReducer
});
