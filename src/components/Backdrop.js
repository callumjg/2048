import React from "react";
import "./Backdrop.css";

const Backdrop = props => {
	const getDivs = () =>
		Array(16)
			.fill(null)
			.map((tile, index) => <div key={index} />);
	return <div className="backdrop">{getDivs()}</div>;
};

export default Backdrop;
