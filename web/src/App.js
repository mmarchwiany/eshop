import React, { Component } from "react";
import Games from "./components/games";
import Header from "./components/header";
import Footer from "./components/footer";

class App extends Component {
  state = {
    games: [],
    meta: {
      page: 0,
      page_size: 48,
      pages: 0
    }
  };

  fetchGames = (page, page_size) => {
    fetch(`http://localhost:3001/games?page=${page}&page_size=${page_size}`)
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
        <Header></Header>
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
