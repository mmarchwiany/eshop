import { connect } from "react-redux";
import Pagination from "./pagination";
import React, { Component } from "react";
import { doFetchGames } from "../actions/games";

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
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.doFetchGames({ page: 0, page_size: 50, search: "", order: "" });
  }

  render() {
    return (
      <div className="container">
        <Pagination />
        <div className="row">
          {(this.props.games || []).map((game, index) => (
            <Game game={game} key={game.id} />
          ))}
        </div>
        <Pagination />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  games: state.games.games,
  meta: state.meta
});

const mapDispatchToProps = dispatch => ({
  doFetchGames: query => dispatch(doFetchGames(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Games);
