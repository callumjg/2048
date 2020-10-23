import React, { useEffect } from "react";
import { connect } from "react-redux";
import TileBoard from "./TileBoard";
import Header from "./Header";
import GameControls from "./GameControls";
import Tutorial from "./Tutorial";
import handleSwipe from "../utils/handleSwipe";
import { moveTiles, addRandomTile } from "../actions";
import "./App.css";

const App = ({ moveTiles, addRandomTile }) => {
  useEffect(() => {
    const keyRouting = {
      ArrowDown: () => moveTiles("down"),
      ArrowUp: () => moveTiles("up"),
      ArrowLeft: () => moveTiles("left"),
      ArrowRight: () => moveTiles("right"),
    };
    const handleKeyDown = (e) => {
      if (!keyRouting[e.key]) return;
      e.preventDefault();
      keyRouting[e.key]();
    };
    document.addEventListener("keydown", handleKeyDown);
    handleSwipe(document, moveTiles);
    addRandomTile(2);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [moveTiles, addRandomTile]);

  return (
    <div id="app-container">
      <div className="app">
        <Header />
        <TileBoard />
        <GameControls />
        <Tutorial />
      </div>
    </div>
  );
};

const mapStateToProps = ({ tiles }) => ({ tiles });

export default connect(mapStateToProps, { moveTiles, addRandomTile })(App);
