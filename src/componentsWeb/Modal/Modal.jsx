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
				<img
					src="data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMyIgaGVpZ2h0PSIyNyIgdmlld0JveD0iMCAwIDMxIDM0Ij48cGF0aCBkPSJNMjguNiA0LjFjMS0wLjUgMS0wLjUtMC41LTIgLTEtMS41LTEtMS41LTEuNS0wLjUgLTAuNSAwLjUtMSAxLjUtMS41IDEuNSAtMC41IDAuNS0wLjUgMS0wLjUgMS41IDAgMC0xLjUgMS41LTMuMSAzIC0xLjUgMS41LTMuNiAzLTQuNiA0IC0xIDEtMi4xIDItMi4xIDIgLTAuNSAwLTIuNi0yLjUtNC42LTQuOUM4LjEgNi4xIDUuNSAzLjYgNSAzLjYgNCAyLjYgMyAzLjEgMy41IDQuMWMwLjUgMC41IDAgMSAwIDAuNSAtMC41IDAtMSAwLTEuNSAwLjUgLTEgMS0xIDEgMCAxLjUgMS41IDEgNi43IDUuNCA4LjcgNy45bDEuNSAxLjUgLTIuMSAyLjVjLTEgMS0yLjYgMy0zLjYgNC40IC0yLjYgMi41LTYuNyA4LjQtNi4yIDguOSAwIDAgMC41IDAuNSAxLjUgMC41IDEuNSAxIDEuNSAxIDIuMS0wLjUgMC41LTEgMy4xLTQgNS42LTYuNGw1LjEtNC45IDIuNiAyLjVjMS41IDEuNSAzLjYgNCA1LjEgNS40bDMuMSAyLjUgMC41LTFjMS0xLjUgMS0yIDAtMyAtMC41LTAuNS0xLjUtMi0yLjYtMyAtMi4xLTMtNS4xLTYuOS01LjYtNi45IDAtMC41IDEuNS0zIDUuNi03LjlDMjQuNSA3LjYgMjcuMSA1LjEgMjguNiA0LjF6TTE5LjkgMjAuOWMxIDEuNSAyLjEgMyAyLjYgMy41IDAuNSAwLjUgMC41IDEuNSAwLjUgMnYwLjVjMC0wLjUtMS41LTItMy4xLTMuNSAtMy42LTMuNS0zLjYtMy41LTMuMS00LjRDMTcuNCAxOC40IDE3LjkgMTguOSAxOS45IDIwLjl6TTE3LjkgMTQuNWMtMSAxLTEuNSAyLTEuNSAyLjVzLTMuMSAzLjUtNi43IDYuOWMtMy42IDMuNS02LjIgNi40LTYuMiA2LjkgMCAwLTAuNSAwLjUtMSAwLjUgLTEgMC0xLTAuNSAxLjUtMy41IDIuMS0zLjUgNi4yLTguNCA4LjItOS45bDIuMS0xLjUgLTEuNS0yTDcuMSA5QzUgNy4xIDQgNS4xIDQgNS4xYzAuNSAwIDIuMSAxIDMuNiAzIDEuNSAyIDQuMSA0LjQgNS4xIDUuNGwyLjEgMi41IDMuNi00LjRjMi4xLTIgNC4xLTMuNSA0LjEtMy41QzIzIDguMSAxOS45IDEyIDE3LjkgMTQuNXoiLz48L3N2Zz4="
					alt="Close"
					className="product-modal__close-btn"
					onClick={closeModal}
				/>
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
