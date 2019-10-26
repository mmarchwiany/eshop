import { call, put } from "redux-saga/effects";
import { doAddGames, doFetchErrorGames } from "../actions/games";

const fetchGames = ({ page = 0, page_size = 48, search = "", order = "" }) => {
  console.log({ page, page_size, search, order });

  return fetch(
    `http://localhost:3001/games?page=${page}&page_size=${page_size}&filters[title]=${search}&order=${order}`
  ).then(response => response.json());
};

function* handleFetchGames(action) {
  try {
    let response = yield call(fetchGames, action.query);
    yield put(doAddGames(response));
  } catch (error) {
    yield put(doFetchErrorGames(error));
  }
}

export { handleFetchGames };
