import { combineReducers } from "redux";

const tilesReducer = (state = [], action) => {
	switch (action.type) {
		case "ADD_TILE":
			return [...state, action.payload];
		case "MOVE_TILES":
			return action.payload;
		default:
			return state;
	}
};

export default combineReducers({
	tiles: tilesReducer
});
