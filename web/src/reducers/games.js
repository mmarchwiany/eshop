import { FETCH_GAMES, FETCH_GAMES_SUCCESS } from "../constants/actionTypes";

const INITIAL_STATE = {
  games: [],
  meta: { page: 0, page_size: 0, pages: 0 },
  query: { search: "", sort: "" }
};

function gamesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_GAMES:
      const { page, page_size } = action;
      const { search, sort } = action;
      return {
        ...state,
        meta: { ...state.meta, page, page_size },
        query: { ...state.query, search, sort }
      };
    case FETCH_GAMES_SUCCESS:
      const data = {
        games: action.response.games,
        meta: action.response.meta
      };

      return {
        ...state,
        ...data
      };
    default:
      return state;
  }
}

export default gamesReducer;
