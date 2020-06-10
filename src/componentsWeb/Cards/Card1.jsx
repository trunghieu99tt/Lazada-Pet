import React from "react";

// Ví dụ: Card của danh mục ở trang chủ

const Card1 = ({ background, image, title, description }) => {
	return (
		<div
			className="card1"
			style={{
				background: `url(${background})`,
			}}
		>
			<div className="card1__image-container">
				<img src={image} alt={title} className="card1__image" />
			</div>

			<div className="card1-text">
				<div className="text-effect-1 card1__title">{title}</div>

				<div className="card1__description">{description}</div>
			</div>
		</div>
	);
};

export default Card1;
