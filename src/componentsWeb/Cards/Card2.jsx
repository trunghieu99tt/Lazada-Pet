import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import AddToCardButton from "../SmallComponents/Buttons/AddToCardButton";
import Rating from "../SmallComponents/Rating";

// Card của product

const Card2 = (props) => {
    const {
        imageURL,
        name,
        rating,
        price,
        viewProduct,
        productID,
        size,
        averageRating,
    } = props;

    // const item = {
    //     imageURL,
    //     name,
    //     rating,
    //     price,
    //     productID,
    //     averageRating,
    // };

    return (
        <article className={`col-md-${size || 2} card2`}>
            <figure className="card2-image-container">
                <Link to={`/product/${productID}`}>
                    <img
                        src={imageURL}
                        alt={name}
                        className="card2__image"
                    ></img>
                </Link>

                <AddToCardButton item={props}></AddToCardButton>

                <nav className="card2__option">
                    <FontAwesomeIcon
                        icon={faEye}
                        onClick={() => viewProduct(props)}
                    />
                    <FontAwesomeIcon icon={faHeart} />
                </nav>
            </figure>

            <div className="card2-detail">
                <Link to={`/product/${productID}`}>
                    <p className="card2__name">{name} </p>
                </Link>

                <Rating rating={rating || averageRating} />
                <p className="card2__price">${price}</p>
            </div>
        </article>
    );
};

export default Card2;
