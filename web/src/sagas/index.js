import { takeLatest, all } from "redux-saga/effects";
import { FETCH_GAMES } from "../constants/actionTypes";
import { handleFetchGames } from "./games";

export default function* rootSaga() {
  yield all([takeLatest(FETCH_GAMES, handleFetchGames)]);
}
