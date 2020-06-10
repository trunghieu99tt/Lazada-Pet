import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { encodeStr } from "../../utils/helper";
import Rating from "../Rating";

// Card của product

const Card2 = (props) => {
	const { imageURL, name, rating, price, viewProduct } = props;

	return (
		<article className="card2">
			<Link to={`/product/${encodeStr(name || "")}`}>
				<figure className="card2-image-container">
					<img
						src={imageURL}
						alt={name}
						className="card2__image"
					></img>

					<figcaption className="card2-menu">
						<Link to={`/product`}>
							<div className="button--1">Add to cart</div>
						</Link>

						<nav className="card2-menu__option">
							<FontAwesomeIcon
								icon={faEye}
								onClick={() => viewProduct(props)}
							/>
							<FontAwesomeIcon icon={faHeart} />
						</nav>
					</figcaption>
				</figure>
			</Link>

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
