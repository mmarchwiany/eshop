import { FETCH_GAMES, FETCH_GAMES_SUCCESS } from "../constants/actionTypes";

const INITIAL_STATE = {
  games: [],
  meta: { page: 0, page_size: 0, pages: 0 },
  query: { search: "", sort: "" }
};

function gamesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_GAMES:
      console.log({ ...action.query });
      return {
        ...state,
        games: [],
        ...action.query
      };
    case FETCH_GAMES_SUCCESS:
      return {
        games: action.response.games,
        meta: action.response.meta,
        query: state.query
      };
    default:
      return state;
  }
}

export default gamesReducer;
