import { FETCH_GAMES } from "../constants/actionTypes";

const fetchGames = (page = 0, page_size = 50, search = "", order = "") => ({
  type: FETCH_GAMES,
  page,
  page_size,
  search,
  order
});

export { fetchGames };
