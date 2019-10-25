import { takeEvery, all } from "redux-saga/effects";
import { FETCH_GAMES } from "../constants/actionTypes";
import { handleFetchGames } from "./games";
function* watchAll() {
  yield all([takeEvery(FETCH_GAMES, handleFetchGames)]);
}
export default watchAll;
