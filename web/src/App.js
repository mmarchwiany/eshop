import React, { Component } from "react";
import Games from "./components/games";
import Header from "./components/header";
import Footer from "./components/footer";
import "./App.scss";

class App extends Component {
  constructor(preps) {
    super();
    this.state = {
      games: [],
      search: "",
      order: "",
      meta: {
        page: 0,
        page_size: 96,
        pages: 0
      }
    };
  }

  fetchGames = (page, page_size, search = "", order = "") => {
    fetch(
      `${process.env.REACT_APP_URL}/games?page=${page}&page_size=${page_size}&filters[title]=${search}&order=${order}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ games: data.games, meta: data.meta });
      })
      .catch(console.log);
  };

  componentDidMount() {
    this.fetchGames(this.state.meta.page, this.state.meta.page_size);
  }

  render() {
    return (
      <div>
        <Header
          search={this.state.search}
          meta={this.state.meta}
          order={this.state.order}
          fetchGames={this.fetchGames}
        ></Header>
        <Games
          games={this.state.games}
          meta={this.state.meta}
          fetchGames={this.fetchGames}
        ></Games>
        <Footer />
      </div>
    );
  }
}

export default App;
