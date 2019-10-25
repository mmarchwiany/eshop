import { FETCH_GAMES } from "../constants/actionTypes";

const INITIAL_STATE = {
  games: [],
  meta: { page: 0, page_size: 0, pages: 0 }
};

function gamesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default gamesReducer;
