import React from "react";

class Header extends React.Component {
  constructor(preps) {
    super();
    this.state = {
      search: preps.search,
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
    this.fetchGames(0, this.state.meta.page_size, this.state.search);
  }

  render() {
    return (
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">
          🎮 Nintendo Swith Games
        </a>

        <form class="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            name="search"
            onChange={this.commonChange}
          />
          <button
            class="btn btn-outline-success my-2 my-sm-0"
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
