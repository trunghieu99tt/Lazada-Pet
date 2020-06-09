import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { encodeStr } from "../../utils/helper";
import Rating from "../Rating";

const LatestProductCard = (props) => {
	const { imageURL, name, rating, price, viewProduct } = props;

	return (
		<article className="latest-product-card">
			<Link to={`/product/${encodeStr(name || "")}`}>
				<figure className="latest-product-card-image-container">
					<img
						src={imageURL}
						alt={name}
						className="latest-product-card__image"
					></img>

					<figcaption className="latest-product-card-menu">
						<Link to={`/product`}>
							<div className="button--1">Add to cart</div>
						</Link>

						<nav className="latest-product-card-menu__option">
							<FontAwesomeIcon
								icon={faEye}
								onClick={() => viewProduct(props)}
							/>
							<FontAwesomeIcon icon={faHeart} />
						</nav>
					</figcaption>
				</figure>
			</Link>

			<div className="latest-product-card-detail">
				<Link to={`/product/${encodeStr(name || "")}`}>
					<p className="latest-product-card__name">{name} </p>
				</Link>

				<Rating rating={rating} />
				<p className="latest-product-card__price">${price}</p>
			</div>
		</article>
	);
};

export default LatestProductCard;
