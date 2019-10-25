import { connect } from "react-redux";
import Pagination from "./pagination";
import React, { Component } from "react";
import { fetchGames } from "../actions/games";

const Game = ({ game }) => {
  return (
    <div key="{game.id}" className="col-6 col-sm-4 col-md-3 col-lg-2">
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
  );
};

class Games extends Component {
  constructor(preps) {
    super();
    this.state = {
      games: preps.games
    };
  }

  componentDidMount() {
    this.props.fetchGames();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {(this.state.games.games || []).map((game, index) => (
            <Game game={game} key={game.id} />
          ))}
        </div>
        <Pagination games={this.state.games} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  games: state.games
});

const mapDispatchToProps = dispatch => ({
  fetchGames: () => dispatch(fetchGames())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Games);
