import { combineReducers } from "redux";

const tilesReducer = (state = [], action) => {
	switch (action.type) {
		case "ADD_TILE":
			return [...state, action.payload];
		case "MOVE_TILES":
			return action.payload;
		case "NEW_GAME":
			return [];
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

const tutorialReducer = (state = true, action) => {
	switch (action.type) {
		case "OPEN_TUTORIAL":
			return true;
		case "CLOSE_TUTORIAL":
			return false;
		default:
			return state;
	}
};
export default combineReducers({
	tiles: tilesReducer,
	score: scoreReducer,
	isGameOver: gameOverReducer,
	isTutorialOpen: tutorialReducer
});
