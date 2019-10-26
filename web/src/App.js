import React, { Component } from "react";
import Games from "./components/games";
import Header from "./components/header";
import Footer from "./components/footer";
import "./App.scss";

class App extends Component {
  constructor(preps) {
    super();
    this.state = {
      search: "",
      order: ""
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Games />
        <Footer />
      </div>
    );
  }
}

export default App;
