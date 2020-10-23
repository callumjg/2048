import React from "react";
import "./Backdrop.css";

const Backdrop = (props) => {
  const getBackdropTiles = () =>
    Array(16)
      .fill(null)
      .map((_, index) => <div key={index} />);

  return <div className="backdrop">{getBackdropTiles()}</div>;
};

export default Backdrop;
