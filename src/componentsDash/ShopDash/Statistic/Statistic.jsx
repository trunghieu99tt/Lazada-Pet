import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../axios";

const Statistic = () => {
	const currentUser = useSelector((state) => state.user.currentUser);
	const [state, setState] = useState({
		ordersCounter: 0,
	});

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const response = await axios.get(`/orders/`);
		const shopResponse = await axios.get("/shops/");
		const userResponse = await axios.get("/customers/");

		const allOrders = response?.data || [];
		const allShops = shopResponse?.data || [];
		const allCustomers = userResponse?.data || [];

		const currentShop = allShops.find(
			(item) =>
				item && currentUser && item.username === currentUser.username
		);

		const shopID = currentShop?.id;

		const filtedOrders = allOrders?.filter(
			(item) => item.shopId === shopID
		);

		setState({
			...state,
			ordersCounter: filtedOrders?.length || 0,
		});
	};

	return (
		<section className="shopDashStatistic">
			<h1>Total Order: {state.ordersCounter}</h1>
		</section>
	);
};

export default Statistic;
