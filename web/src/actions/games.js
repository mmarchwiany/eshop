import {
  FETCH_GAMES,
  FETCH_GAMES_SUCCESS,
  FETCH_GAMES_ERROR
} from "../constants/actionTypes";

const doAddGames = response => ({
  type: FETCH_GAMES_SUCCESS,
  response
});

const doFetchGames = query => ({
  type: FETCH_GAMES,
  query
});

const doFetchErrorGames = error => ({
  type: FETCH_GAMES_ERROR,
  error
});

export { doAddGames, doFetchGames, doFetchErrorGames };
