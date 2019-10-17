import React from "react";

class Header extends React.Component {
  constructor(preps) {
    super();
    this.state = {
      search: preps.search,
      order: preps.order,
      meta: preps.meta
    };
    this.fetchGames = preps.fetchGames;
    this.commonChange = this.commonChange.bind(this);
    this.search = this.search.bind(this);
  }

  commonChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  search(event) {
    event.preventDefault();
    this.fetchGames(
      0,
      this.state.meta.page_size,
      this.state.search,
      this.state.order
    );
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
            <option value="updated_at">Modified [asc]</option>
            <option value="-updated_at">Modified [desc]</option>
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
            onClick={this.search}
          >
            Search
          </button>
        </form>
      </nav>
    );
  }
}

export default Header;
