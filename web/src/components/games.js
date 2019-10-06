import React from "react";
import Pagination from "./pagination";

const Games = ({ games, meta, fetchGames }) => {
  return (
    <div className="container">
      <div className="row">
        {games.map((game, index) => (
          <div key="{game.id}" className="col-2">
            <div className="card">
              <div className="image">
                <img
                  src={game.image_local || game.image}
                  className="img-fluid"
                  alt=""
                ></img>
              </div>
              <div className="card-body">
                <p className="card-title">{game.title}</p>
                <p className="card-text">
                  <span
                    className={
                      game.prices[0] && game.prices[0].discount_price
                        ? "old"
                        : "badge badge-info"
                    }
                  >
                    {game.prices[0] && game.prices[0].price}
                    {game.prices[0] && game.prices[0].currency}
                  </span>
                  <span
                    className={
                      game.prices[0] && game.prices[0].discount_price
                        ? "badge badge-danger"
                        : "badge badge-info"
                    }
                  >
                    {game.prices[0] && game.prices[0].discount_price}
                    {game.prices[0] &&
                      game.prices[0].discount_price &&
                      game.prices[0].currency}
                  </span>
                </p>
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
