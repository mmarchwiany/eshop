import { call, put } from "redux-saga/effects";
import { doAddStories } from "../actions/story";

const fetchGames = (page, page_size, search, order) => {
  console.info("call");
  fetch(
    `${process.env.REACT_APP_URL}/games?page=${page}&page_size=${page_size}&filters[title]=${search}&order=${order}`
  )
    .then(res => res.json())
    .catch(console.log);
};
function* handlefetchGames(action) {
  yield put(doAddStories(yield call(fetchGames, ...action)));
}
export { handleFetchGames };
