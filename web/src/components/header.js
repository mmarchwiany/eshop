import { connect } from "react-redux";
import React from "react";
import { doFetchGames } from "../actions/games";

class Header extends React.Component {
  constructor(preps) {
    super();
    this.commonChange = this.commonChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  commonChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSearch(event, data) {
    event.preventDefault();
    this.props.doFetchGames({ ...this.props.meta, ...data });
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
            onChange={this.commonChange}
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
            onChange={this.commonChange}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            onClick={this.handleSearch}
          >
            Search
          </button>
        </form>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  meta: state.games.meta
});

const mapDispatchToProps = dispatch => ({
  doFetchGames: query => dispatch(doFetchGames(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
