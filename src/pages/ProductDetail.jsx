import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { compose } from "redux";
import axios from "../axios";
import Card2 from "../componentsWeb/Cards/Card2";
import Modal from "../componentsWeb/HomePageComponents/Modal/Modal";
import AddToCardButton from "../componentsWeb/SmallComponents/Buttons/AddToCardButton";
import Loader from "../componentsWeb/SmallComponents/Loader";
import WrapperWithNoAds from "../layout/WrapperWithNoAds";
import * as appTypes from "../redux/web/app/app.types";

const ProductDetail = (props) => {
	const [data, setData] = useState(null);
	const { fetchProducts, allProducts } = props;

	const [state, setState] = useState({
		quantityValue: 1,
		activeTab: 0,
		singleProduct: null,
	});

	const params = useParams();

	useEffect(() => {
		getData();

		if (!allProducts) {
			fetchProducts();
		}
	}, []);

	useEffect(() => {
		getData();

		if (!allProducts) {
			fetchProducts();
		}
	}, [params]);

	const getData = async () => {
		const id = params?.id;

		const response = await axios(`/products/${id}`);
		setData(response?.data);
	};

	const changeQuantity = (operator = "+") => {
		if (operator === "+")
			setState((prevState) => ({
				quantityValue: prevState.quantityValue + 1,
			}));
		else
			setState((prevState) => ({
				quantityValue: Math.max(0, prevState.quantityValue - 1),
			}));
	};

	const changeQuantityInput = (event) => {
		setState({
			quantityValue: Math.max(1, ~~event.target.value),
		});
	};

	const setActiveTab = (idx) => {
		setState({ activeTab: idx });
	};

	const toggleShowModal = (open = true) => {
		const modal = document.querySelector(".product-modal-container");
		if (modal) {
			if (open) modal.classList.add("active");
			else modal.classList.remove("active");
		}
	};

	const viewProduct = (product) => {
		toggleShowModal();
		setState({
			singleProduct: product,
		});
	};

	const closeModal = () => {
		toggleShowModal(false);
		setState({
			product: null,
		});
	};

	const {
		match: {
			params: { id },
		},
	} = props;

	const { quantityValue, activeTab, singleProduct } = state;

	if (!data) return <Loader />;

	const {
		productImage: imageURL,
		name,
		description,
		price,
		rating,
		productType,
	} = data;

	const filterProducts =
		(allProducts &&
			allProducts.length > 0 &&
			allProducts.filter((e) => e.productType === productType)) ||
		[];

	console.log("allProducts", allProducts);
	console.log("filterProducts", filterProducts);
	console.log("productType", productType);

	const relatedProducts =
		filterProducts &&
		filterProducts.length > 0 &&
		filterProducts
			.filter((item) => item.id !== data.id)
			.slice(0, Math.min(filterProducts.length, 4));

	const additionalInfoName = [
		"Description",
		"Additional Information",
		"Reviews",
	];

	console.log("relatedProducts", relatedProducts);

	return (
		<React.Fragment>
			<Modal item={singleProduct} closeModal={closeModal} />

			<div className="product-detail-wrapper">
				<section className=" product-info">
					<div className="row">
						<figure className="col-md-5 product-modal-image-container">
							<img
								src={imageURL}
								alt={name || ""}
								className="product-modal-image"
							/>
						</figure>

						<div className="col-md-7 product-modal-text">
							<Link
								className="component-heading product-modal__name"
								to={`/product/${id}`}
							>
								{name || ""}
							</Link>
							{/* <Rating rating={rating} /> */}
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

								<AddToCardButton
									item={data}
									amount={quantityValue}
								/>
							</div>
						</div>
					</div>
				</section>
				<section className=" product-additional-info">
					<header className="product-additional-info-header">
						{additionalInfoName &&
							additionalInfoName.length > 0 &&
							additionalInfoName.map((item, index) => (
								<div
									className={`product-additional-info-header-item ${
										activeTab === index ? "active" : ""
									}`}
									onClick={() => setActiveTab(index)}
								>
									<p
										className={`product-additional-info-header-item__title ${
											activeTab === index ? "active" : ""
										}`}
									>
										{item}
									</p>
								</div>
							))}
					</header>
					<div className="product-additional-info-content">
						{additionalInfoName &&
							additionalInfoName.length > 0 &&
							additionalInfoName.map((item, index) => {
								return (
									<div
										className={`product-additional-info-content-item ${
											activeTab === index ? "active" : ""
										}`}
									>
										{description}
									</div>
								);
							})}
					</div>
				</section>
				{relatedProducts?.length > 0 && (
					<section className="product-related-items">
						<header className="product-related-items-header">
							<p>Related Products</p>
						</header>

						<div className="row">
							{relatedProducts &&
								relatedProducts.map((item) => (
									<Card2
										{...item}
										imageURL={item.productImage}
										viewProduct={viewProduct}
									/>
								))}
						</div>
					</section>
				)}
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	allProducts: state.app.allProducts,
});

const mapDispatchToProps = (dispatch) => ({
	fetchProducts: () => dispatch({ type: appTypes.FETCH_ALL_PRODUCTS_DATA }),
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

const wrapper = compose(connectToStore, WrapperWithNoAds);

export default wrapper(ProductDetail);
