import { combineReducers } from "redux";
import gamesReducer from "./games";

const rootReducer = combineReducers({
  games: gamesReducer
});
export default rootReducer;
