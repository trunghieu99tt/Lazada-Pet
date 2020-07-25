import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../axios";
import Loader1 from "../../componentsWeb/SmallComponents/Loader1";
import SearchDash from "../../componentsWeb/SmallComponents/SearchDash";
import { orderStatusOptions } from "../../variables";

const UserOrderList = ({ setID, setCurrentPage }) => {
	const [data, setData] = useState(null);
	const [productsData, setProductsData] = useState(null);
	const [initialData, setInitialData] = useState(null);
	const [page, setPage] = useState(1);
	const pageSize = 5;
	const currentUser = useSelector((state) => state.user.currentUser);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const response = await axios.get(`/orders`);
		const productsResponse = await axios.get("/products");

		const allOrders = response?.data || [];
		const allProducts = productsResponse?.data || [];

		const filtedOrders = allOrders?.filter(
			(item) => item.customerId === currentUser.id
		);

		setData(filtedOrders);
		setProductsData(allProducts);
		setInitialData(filtedOrders);
	};

	const changePagination = (current) => setPage(current);

	const handleSearchInput = (event) => {
		const { value } = event.target;
		const searchResult = initialData?.filter((item) => {
			const name = item?.name?.toLowerCase();
			return name.includes(value.toLowerCase());
		});
		setData(searchResult);
	};

	if (!data) return <Loader1 />;

	const from = pageSize * (page - 1);
	const to = Math.min(pageSize * page, data.length);
	const showData = data?.slice(from, to);

	const values = Object.entries(orderStatusOptions);

	return (
		<section className="userOrdersList">
			<header className="userOrdersList-header">
				<h3>Orders List ({initialData?.length || 0})</h3>

				<SearchDash
					name="Search Order by id, name,..."
					handleOnChange={handleSearchInput}
				/>
			</header>

			{(showData?.length > 0 &&
				showData.map((item) => {
					const productData =
						productsData?.length > 0 &&
						productsData.find((e) => e.id === item.productId);

					const filteredValue = values.find(
						(e) => e && e.length > 1 && e[1] === item.status
					);

					return (
						<div
							className="group-container userOrdersList-item"
							deliverystatus={filteredValue?.[0]}
						>
							<figure className="userOrdersList-item__image-container">
								<img
									src={
										productData.productImage ||
										item.imageURL
									}
									alt={productData.name || item.name}
									className="userOrdersList-item__image"
								/>
							</figure>
							<p className="userOrdersList-item__name">
								<p>Name</p>
								<p>{productData.name || item.name}</p>
							</p>
							<p className="userOrdersList-item__price">
								<p>Price</p>
								<p>{item.price}$</p>
							</p>
							<p className="userOrdersList-item__amount">
								<p>Amount</p>
								<p>{item.amount}</p>
							</p>
							<p className="userOrdersList-item__total">
								<p>Total</p>
								<p>{item.price * item.amount}$</p>
							</p>

							<button
								className="button--1"
								onClick={() => {
									setID(item.id);
									setCurrentPage(3);
								}}
							>
								View Order
							</button>
						</div>
					);
				})) || <p>No result found</p>}

			{data?.length > pageSize && (
				<div>
					<Pagination
						key={data.length}
						defaultCurrent={1}
						total={data?.length || 0}
						defaultPageSize={pageSize}
						current={page}
						onChange={changePagination}
					/>
				</div>
			)}
		</section>
	);
};

export default UserOrderList;
