import React, { useState } from "react";
import Rating from "../Rating";

const Modal = ({ imageURL, name, rating, description, price, closeModal }) => {
	const [quantityValue, setQuantityValue] = useState(1);

	const changeQuantity = (operator = "+") => {
		if (operator === "+") setQuantityValue(quantityValue + 1);
		else setQuantityValue(Math.max(0, quantityValue - 1));
	};

	const changeQuantityInput = (event) => {
		setQuantityValue(~~event.target.value);
	};

	return (
		<section className="product-modal-container">
			<div className="product-modal-mask" onClick={closeModal}></div>

			<div className="container product-modal-inner">
				<div className="row">
					<figure className="col-md-5 product-modal-image-container">
						<img
							src={imageURL}
							alt={name || ""}
							className="product-modal-image"
						/>
					</figure>

					<div className="col-md-7 product-modal-text">
						<div className="component-heading product-modal__name">
							{name || ""}
						</div>
						<Rating rating={rating} />
						<div className="product-modal__price">${price}</div>

						<div className="component-description product-modal__description">
							{description}
						</div>

						<div className="row align-items-center">
							<div className="product-modal-quantity">
								<input
									type="number"
									className="product-modal-quantity__input"
									value={quantityValue}
									onChange={changeQuantityInput}
									name="quantityValue"
								/>
								<div className="product-modal-quantity__change-buttons">
									<p
										className="product-modal-quantity__change-buttons--1"
										onClick={() => changeQuantity("+")}
									>
										+
									</p>
									<p
										className="product-modal-quantity__change-buttons--2"
										onClick={() => changeQuantity("-")}
									>
										-
									</p>
								</div>
							</div>

							<div className="button--1">Add To Cart</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Modal;
