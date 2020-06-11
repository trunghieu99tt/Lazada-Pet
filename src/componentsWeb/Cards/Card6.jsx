import React from "react";

const Card6 = ({ title, description, author }) => {
	return (
		<article className="card6">
			<figure className="card6-logo-container">
				<img
					src={require("../../static/images/firework.svg")}
					alt="firework-logo"
					className="card6-logo"
				/>
			</figure>

			<div className="card6__title">{title || ""}</div>

			<div className="card6__description">{description || ""}</div>

			<div className="card6__author">{author || ""}</div>
		</article>
	);
};

export default Card6;
