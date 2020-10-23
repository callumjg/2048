import React, { useMemo } from "react";
import "./Tile.css";

const Tile = ({ windowSize, value, row, col, style }) => {
  const { opacity, width } = style;
  const length = useMemo(() => (windowSize > 500 ? 105 * width : 63 * width), [
    windowSize,
    width,
  ]);
  const innerStyle = {
    height: `${length}px`,
    width: `${length}px`,
  };

  return (
    <div className={`tile tile-position-${row}-${col}`} style={{ opacity }}>
      <div
        className={` tile-${value <= 2048 ? value : "plus"}`}
        style={innerStyle}
      >
        <p>{value}</p>
      </div>
    </div>
  );
};

export default Tile;
