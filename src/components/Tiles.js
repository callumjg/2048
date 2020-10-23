import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { TransitionMotion, spring } from "react-motion";
import Tile from "./Tile";

const Tiles = ({ tiles }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = (e) => setWindowSize(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const willLeave = () => ({
    opacity: spring(0, {
      precision: 0.1,
      stiffness: 250,
      damping: 20,
    }),
  });

  const willEnter = () => ({
    opacity: 0,
    height: 0,
    width: 0,
  });

  const getTileStyle = () =>
    tiles.map((tile) => ({
      key: tile.key.toString(),
      style: {
        opacity: spring(1, {
          precision: 0.1,
          stiffness: 150,
          damping: 20,
        }),
        width: spring(1, { precision: 0.1, stiffness: 120 }),
      },
      data: {
        value: tile.value,
        x: tile.x,
        y: tile.y,
      },
    }));

  return (
    <TransitionMotion
      willEnter={willEnter}
      willLeave={willLeave}
      styles={getTileStyle()}
    >
      {(interpolatedStyles) => (
        <>
          {interpolatedStyles.map((config) => (
            <Tile
              value={config.data.value}
              windowSize={windowSize}
              key={parseInt(config.key)}
              row={config.data.y}
              col={config.data.x}
              width={config.data.width}
              style={config.style}
            />
          ))}
        </>
      )}
    </TransitionMotion>
  );
};

const mapStateToProps = ({ tiles }) => ({ tiles });

export default connect(mapStateToProps)(Tiles);
