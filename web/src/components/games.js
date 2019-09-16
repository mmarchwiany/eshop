import React from "react";
import "./games.css";
import Pagination from "./pagination";

const Games = ({ games, meta, fetchGames }) => {
  return (
    <div className="container">
      <div class="row">
        {games.map((game, index) => (
          <div class="col-2">
            <div class="card">
              <div class="image">
                <img
                  src={game.image}
                  class="img-fluid img-thumbnail"
                  alt=""
                ></img>
              </div>
              <div class="card-body">
                <h5 class="card-title">{game.title}</h5>
                <p class="card-text">
                  {game.prices[0] && game.prices[0].price}
                  {game.prices[0] && game.prices[0].currency}
                </p>
                <a href="#" class="btn btn-outline-primary btn-block">
                  Check price
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination meta={meta} fetchGames={fetchGames} />
    </div>
  );
};

export default Games;
