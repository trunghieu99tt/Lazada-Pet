import { Modal, Pagination } from "antd";
import Axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card2 from "../../componentsWeb/Cards/Card2";
import Loader1 from "../../componentsWeb/SmallComponents/Loader1";
import SelectBox from "../../componentsWeb/SmallComponents/SelectBox";
import * as appTypes from "../../redux/web/app/app.types";
import { API_URL_1 } from "../../variables";

const UserSuggestions = () => {
	const [data, setData] = useState(null);
	const [orderData, setOrderData] = useState(null);
	const [item, setItem] = useState(null);
	const [orderValue, setOrderValue] = useState(null);
	const [currPage, setCurrPage] = useState(1);
	const dispatch = useDispatch();
	const products = useSelector((state) => state.app.allProducts);
	const pageSize = 6;

	useEffect(() => {
		getAllProducts();
		getOrderedData();
	}, []);

	useEffect(() => {
		const orderedCategories = orderData
			?.reduce((res, item) => {
				const { categories } = item;
				if (categories) {
					return [...res, ...categories];
				} else return [...res];
			}, [])
			.filter(Boolean);

		const filteredSuggestion =
			(products?.length > 0 &&
				products.filter((product) => {
					return (
						product?.categories?.filter((value) =>
							orderedCategories?.includes(value)
						).length > 0
					);
				})) ||
			[];

		setData(filteredSuggestion);
	}, [products, orderData]);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [currPage]);

	const getAllProducts = useCallback(() => {
		dispatch({
			type: appTypes.FETCH_ALL_PRODUCTS_DATA,
		});
	}, [dispatch]);

	const getOrderedData = async () => {
		const id = 1;
		const response = await Axios.get(`${API_URL_1}/users/1/orders/`);

		console.log("response.data", response.data);

		setOrderData(response?.data);
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
			case "rating":
				orderedProducts = [...data].sort(
					(a, b) => b.averageRating - a.averageRating
				);
				orderValue = "Sort by average rating: high to low";
				break;
			case "price":
				orderedProducts = [...data].sort((a, b) => a.price - b.price);
				orderValue = "Sort by price: low to high";
				break;
			case "price-desc":
				orderedProducts = [...data].sort((a, b) => b.price - a.price);
				orderValue = "Sort by price: high to low";
				break;
			default:
				orderedProducts = [...data];
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

	if (!data || !orderData) return <Loader1 />;

	return (
		<React.Fragment>
			<Modal item={item} closeModal={closeModal} />

			<section className="userSuggestions">
				<SelectBox value={orderValue} orderBy={orderBy} />
				<div className="userSuggestions-products">
					<div className="row">
						{currShowItems?.length > 0 &&
							currShowItems.map((item) => {
								return (
									<Card2
										size={4}
										rating={item.averageRating}
										{...item}
										viewProduct={viewProduct}
									/>
								);
							})}
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
					</div>
				</div>
			</section>
		</React.Fragment>
	);
};

export default UserSuggestions;
