import { call, put } from "redux-saga/effects";
import { doFetchGamesSuccess, doFetchGamesError } from "../actions/games";

const fetchGames = ({ page = 0, page_size = 48, search = "", order = "" }) => {
  console.log({ page, page_size, search, order });

  return fetch(
    `http://localhost:3001/games?page=${page}&page_size=${page_size}&filters[title]=${search}&order=${order}`
  ).then(response => response.json());
};

function* handleFetchGames(action) {
  try {
    let response = yield call(fetchGames, {
      ...action.query.meta,
      ...action.query.query
    });
    yield put(doFetchGamesSuccess(response));
  } catch (error) {
    yield put(doFetchGamesError(error));
  }
}

export { handleFetchGames };
