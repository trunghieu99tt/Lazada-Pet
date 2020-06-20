import React, { useState } from "react";
import DataTable from "../../../CommonComponents/Tables/DataTable";
import OrderDetail from "../OrderDetail";

const randomDate = (start, end) => {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
};

const OrderWrapper = () => {
	const [order, setOrder] = useState(null);
	const [data, setData] = useState(
		[...Array(100)].map((_, idx) => {
			const d = randomDate(new Date(2019, 0, 1), new Date(2022, 0, 1));
			const convertedDate = `${d.getDate()}-${
				d.getMonth() + 1
			}-${d.getFullYear()}`;

			return {
				orderID: idx + 1,
				name: "Product",
				type: "Pet",
				purchasedOn: convertedDate,
				customer: "Tom",
				shipTo: "Germany",
				basePrice: "$1100",
				purchasedPrice: "$2300",
				status: "Processing",
			};
		})
	);

	// Functions
	const viewOrder = (order) => setOrder(order);
	const resetOrder = () => setOrder(null);

	const handleEditItem = (item) => {
		const filterData = data.filter((e) => e.orderID !== item.orderID);
		const newData = [...filterData, item].sort(
			(a, b) => a.orderID - b.orderID
		);
		setData(newData);
		resetOrder();
	};

	const deleteOrder = (item) => {
		const newData = data.filter((e) => e.orderID !== item.orderID);
		setData(newData);
	};

	return (
		<section className="shopDash-product-wrapper">
			{(!order && (
				<DataTable
					// key={Math.random()}
					viewOrder={viewOrder}
					dataSample={data}
					deleteOrder={deleteOrder}
				/>
			)) || (
				<OrderDetail
					resetOrder={resetOrder}
					order={order}
					handleEditItem={handleEditItem}
				/>
			)}
		</section>
	);
};

export default OrderWrapper;
