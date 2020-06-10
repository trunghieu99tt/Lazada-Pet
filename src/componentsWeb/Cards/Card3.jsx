import React from "react";

// Card của slide quảng cáo

const Card3 = ({ name, subName, description, url, isActive, index }) => {
	return (
		<article
			className={`card3 ${isActive ? "active" : ""}`}
			card-index={index}
		>
			<h2 className="card3__name">{name}</h2>
			<h3 className="card3__subName">{subName}</h3>
			<p className="card3__description">{description}</p>
			<div className="button--1">Xem thêm</div>
		</article>
	);
};

export default Card3;
