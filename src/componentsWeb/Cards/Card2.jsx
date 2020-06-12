import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { encodeStr } from "../../utils/helper";
import Rating from "../SmallComponents/Rating";

// Card của product

const Card2 = (props) => {
	const { imageURL, name, rating, price, viewProduct } = props;

	return (
		<article className="col-md-3 card2">
			<figure className="card2-image-container">
				<Link to={`/product/${encodeStr(name || "")}`}>
					<img
						src={imageURL}
						alt={name}
						className="card2__image"
					></img>
				</Link>

				<div className="button--1">Add to cart</div>

				<nav className="card2__option">
					<FontAwesomeIcon
						icon={faEye}
						onClick={() => viewProduct(props)}
					/>
					<FontAwesomeIcon icon={faHeart} />
				</nav>
			</figure>

			<div className="card2-detail">
				<Link to={`/product/${encodeStr(name || "")}`}>
					<p className="card2__name">{name} </p>
				</Link>

				<Rating rating={rating} />
				<p className="card2__price">${price}</p>
			</div>
		</article>
	);
};

export default Card2;
