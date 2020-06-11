import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Rating = ({ rating }) => {
	return (
		<div className="rating">
			{[...Array(5)].map((_, index) =>
				index < rating ? (
					<FontAwesomeIcon icon={faStar} color="orange" />
				) : (
					<FontAwesomeIcon icon={faStar} />
				)
			)}
		</div>
	);
};

export default Rating;
