import { connect } from "react-redux";
import React from "react";
import { doFetchGames } from "../actions/games";

class Header extends React.Component {
  constructor(preps) {
    super();
    this.handelSearch = this.handelSearch.bind(this);
    this.handelOrder = this.handelOrder.bind(this);
  }

  handelSearch(event) {
    this.props.doFetchGames({
      meta: this.props.meta,
      query: { ...this.props.query, search: event.target.value }
    });
  }

  handelOrder(event) {
    this.props.doFetchGames({
      meta: this.props.meta,
      query: this.props.query,
      ...{ order: event.target.value }
    });
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <span>🎮</span> Nintendo Swith Games
        </a>

        <form className="form-inline">
          <select
            className="form-control mr-sm-2"
            name="order"
            onChange={this.handelOrder}
          >
            <option value="title">Title [a-z]</option>
            <option value="-title">Title [z-a]</option>
            <option value="price">Price [asc]</option>
            <option value="-price">Price [desc]</option>
            <option value="updatedAt">Modified [asc]</option>
            <option value="-updatedAt">Modified [desc]</option>
          </select>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            name="search"
            onChange={this.handelSearch}
          />
        </form>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  meta: state.games.meta,
  query: state.games.query
});

const mapDispatchToProps = dispatch => ({
  doFetchGames: query => dispatch(doFetchGames(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
