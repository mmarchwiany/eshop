import React, { Component } from "react";
import Games from "./components/games";
import Header from "./components/header";
import Footer from "./components/footer";
import "./App.scss";

const App = () => {
  return (
    <div>
      <Header />
      <Games />
      <Footer />
    </div>
  );
};

export default App;
