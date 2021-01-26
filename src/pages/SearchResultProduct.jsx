import { message, Pagination } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card2 from "../componentsWeb/Cards/Card2";
import Modal from "../componentsWeb/HomePageComponents/Modal/Modal";
import Loader from "../componentsWeb/SmallComponents/Loader";
import SelectBox from "../componentsWeb/SmallComponents/SelectBox";
import WrapperWithNoAds from "../layout/WrapperWithNoAds";
import * as appTypes from "../redux/web/app/app.types";
import { encodeStr } from "../utils/helper";

const SearchResultProduct = () => {
	const { searchQuery } = useParams();
	const [data, setData] = useState(null);
	const [item, setItem] = useState(null);
	const [orderValue, setOrderValue] = useState(null);
	const [currPage, setCurrPage] = useState(1);
	const dispatch = useDispatch();
	const products = useSelector((state) => state.app.allProducts);
	const pageSize = 12;

	useEffect(() => {
		getAllProducts();
	}, []);

	useEffect(() => {
		const filteredData = getFilteredData();
		setData(filteredData);

		if (!filteredData || !filteredData.length) {
			message.error("No result found!");
		}
	}, [products]);

	useEffect(() => {
		window.scrollTo({ top: 500, behavior: "smooth" });
	}, [currPage]);

	const getFilteredData = () => {
		const modifiedQuery = encodeStr(searchQuery);
		const filteredData =
			products?.filter((item) =>
				encodeStr(item.name).includes(modifiedQuery)
			) || [];

		return filteredData;
	};

	const getAllProducts = useCallback(() => {
		dispatch({
			type: appTypes.FETCH_ALL_PRODUCTS_DATA,
		});
	}, [dispatch]);

	const toggleShowModal = (open = true) => {
		const modal = document.querySelector(".product-modal-container");
		if (modal) {
			if (open) modal.classList.add("active");
			else modal.classList.remove("active");
		}
	};

	const viewProduct = (product) => {
		toggleShowModal();
		setItem(product);
	};

	const closeModal = () => {
		toggleShowModal(false);
		setItem(null);
	};

	const orderBy = (orderCondition) => {
		let orderedProducts = [];
		let orderValue = "";

		switch (orderCondition) {
			case "price":
				orderedProducts = [...data].sort((a, b) => a.price - b.price);
				orderValue = "Sort by price: low to high";
				break;
			case "price-desc":
				orderedProducts = [...data].sort((a, b) => b.price - a.price);
				orderValue = "Sort by price: high to low";
				break;
			default:
				orderedProducts = [...getFilteredData()];
		}

		setOrderValue(orderValue);
		setData(orderedProducts);
	};

	const changePagination = (current) => {
		setCurrPage(current);
	};

	const from = pageSize * (currPage - 1);
	const to = pageSize * currPage;

	const currShowItems = data?.slice(from, Math.min(to, data.length));

	if (!data) return <Loader />;

	return (
		<React.Fragment>
			<Modal item={item} closeModal={closeModal} />

			<section className="container-fluid shop-category-page-content">
				<div className="row">
					<div className="col-md-9 shop-category-page-products-container">
						<div className="shop-category-page-products">
							<div className="container-fluid">
								{(data?.length > 0 && (
									<React.Fragment>
										<div className="row">
											{currShowItems?.length > 0 &&
												currShowItems.map((item) => {
													return (
														<Card2
															{...item}
															imageURL={
																item.productImage
															}
															viewProduct={
																viewProduct
															}
														/>
													);
												})}
										</div>
										<div className="pagination-wrapper">
											{data?.length > 0 && (
												<Pagination
													key={currPage}
													defaultCurrent={1}
													total={data?.length || 0}
													defaultPageSize={pageSize}
													current={currPage}
													onChange={changePagination}
													size="small"
												/>
											)}
										</div>
									</React.Fragment>
								)) || <p>No result found!</p>}
							</div>
						</div>
					</div>
					<aside className="col-md-3 shop-category-page-filter">
						<SelectBox value={orderValue} orderBy={orderBy} />
					</aside>
				</div>
			</section>
		</React.Fragment>
	);
};

export default WrapperWithNoAds(SearchResultProduct);
