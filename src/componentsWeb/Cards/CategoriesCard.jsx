import React from "react";

const CategoriesCard = ({ background, image, title, description }) => {
	return (
		<div
			className="categories-card"
			style={{
				background: `url(${background})`,
			}}
		>
			<div className="categories-card__image-container">
				<img
					src={image}
					alt={title}
					className="categories-card__image"
				/>
			</div>

			<div className="categories-card-text">
				<div className="text-effect-1 categories-card__title">
					{title}
				</div>

				<div className="categories-card__description">
					{description}
				</div>
			</div>
		</div>
	);
};

export default CategoriesCard;
