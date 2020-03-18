import {
  FETCH_GAMES,
  FETCH_GAMES_SUCCESS,
  FETCH_GAMES_ERROR
} from "../constants/actionTypes";

const doFetchGamesSuccess = response => ({
  type: FETCH_GAMES_SUCCESS,
  response
});

const doFetchGames = query => ({
  type: FETCH_GAMES,
  query
});

const doFetchGamesError = error => ({
  type: FETCH_GAMES_ERROR,
  error
});

export { doFetchGamesSuccess, doFetchGames, doFetchGamesError };
