import React, { Component } from "react";
import LatestProductCard from "../../Cards/Card2";
import Modal from "../Modal/Modal";

class LatestProducts extends Component {
	state = {
		isOpenModal: false,
		product: null,
	};

	toggleShowModal = (open = true) => {
		const modal = document.querySelector(".product-modal-container");
		if (modal) {
			if (open) modal.classList.add("active");
			else modal.classList.remove("active");
		}
	};

	viewProduct = (product) => {
		this.toggleShowModal();
		this.setState({
			product,
		});
	};

	closeModal = () => {
		this.toggleShowModal(false);
		this.setState({
			product: null,
		});
	};

	render() {
		const { latestProducts } = this.props;
		const { product } = this.state;

		const latestProductsData =
			latestProducts && Object.values(latestProducts);

		return (
			<React.Fragment>
				<Modal {...product} />
				<section className="latest-products-container">
					<header className="container latest-products-header">
						<h2 className="component-heading">Latest Products</h2>
						<p className="component-description">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Tempore repellendus ab repellat sit soluta
							consequuntur obcaecati veniam aliquam. Rerum
							suscipit nam nisi dignissimos soluta nulla illum,
							voluptas sequi obcaecati molestiae.
						</p>
					</header>
					<div className="home-categories">
						{latestProductsData &&
							latestProductsData.length > 0 &&
							latestProductsData.map((item) => {
								return (
									<LatestProductCard
										{...item}
										viewProduct={this.viewProduct}
										closeModal={this.closeModal}
										isHome
									/>
								);
							})}
					</div>
				</section>
			</React.Fragment>
		);
	}
}

export default LatestProducts;
