import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../axios";
import DataTable from "../../../CommonComponents/Tables/DataTable/DataTable";
import Loader1 from "../../../componentsWeb/SmallComponents/Loader1";
import { orderStatusOptions } from "../../../variables";

const randomDate = (start, end) => {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
};

const OrderWrapper = ({ setCurrentPage, setID }) => {
	// State
	const [data, setData] = useState(null);
	const [productsData, setProductsData] = useState(null);
	const [initialData, setInitialData] = useState(null);
	const [customersData, setCustomersData] = useState(null);
	const [page, setPage] = useState(1);
	const pageSize = 5;
	const currentUser = useSelector((state) => state.user.currentUser);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const response = await axios.get(`/orders`);
		const productsResponse = await axios.get("/products");
		const shopResponse = await axios.get("/shops");
		const userResponse = await axios.get("/customers");

		const allOrders = response?.data || [];
		const allProducts = productsResponse?.data || [];
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

		setData(filtedOrders);
		setProductsData(allProducts);
		setInitialData(filtedOrders);
		setCustomersData(allCustomers);
	};

	const tableHeadData = [
		{ width: "117px", name: "Item ID", att: "id", sortable: true },
		{ width: "117px", name: "Name", att: "name", sortable: true },
		{ width: "117px", name: "Type", att: "productType", sortable: false },
		{
			width: "139px",
			name: "Customer",
			att: "customerName",
			sortable: true,
		},
		{ width: "111px", name: "Ship to", att: "address", sortable: false },
		{
			width: "213px",
			name: "Price",
			att: "price",
			sortable: true,
		},
		{ width: "115px", name: "Status", att: "statusText", sortable: false },
		{ width: "122px", name: "Actions", sortable: false },
	];

	const badges = [
		["Pending", "badge-danger"],
		["Processing", "badge-info"],
		["Completed", "badge-success"],
	];

	const statusOptions = ["All", ...badges.map((e) => e[0])];
	const searchFields = [{ name: "By OrderID", attribute: "id" }];

	// Functions

	const handleEditItem = (item) => {
		const filterData = data.filter((e) => e.orderID !== item.orderID);
		const newData = [...filterData, item].sort(
			(a, b) => a.orderID - b.orderID
		);
		setData(newData);
	};

	const deleteItem = (item) => {
		const newData = data.filter((e) => e.id !== item.id);
		setData(newData);
	};

	const statusFilter = (event, dataSample) => {
		const status = event.target.value;
		let finalResult = [...dataSample];
		if (status !== "All") {
			const filterData =
				data?.length &&
				data.filter(
					(e) => e.status.toLowerCase() === status.toLowerCase()
				);
			finalResult = [...filterData];
		}
		return finalResult;
	};

	if (!data) return <Loader1 />;

	// console.log("data", data);
	const values = Object.entries(orderStatusOptions);

	const newData = data.map((item) => {
		const product =
			productsData?.length > 0 &&
			productsData.find((e) => e.id === item.productId);
		const customer =
			customersData?.length > 0 &&
			customersData.find((e) => e.id === item.customerId);

		// console.log("product", product);

		const filteredValue = values.find(
			(e) => e && e.length > 1 && e[1] === item.status
		);

		return {
			...item,
			imageURL: product?.productImage,
			productType: product?.productType,
			name: product?.name,
			customerName: customer?.fullname || "",
			statusText: filteredValue?.[0],
		};
	});

	return (
		<section className="shopDash-order-wrapper">
			<DataTable
				dataSample={newData}
				deleteEntry={deleteItem}
				tableHeadData={tableHeadData}
				tableName="Item"
				statusFilter={statusFilter}
				badges={badges}
				options={statusOptions}
				searchFields={searchFields}
				// existDateRange
				setCurrentPage={setCurrentPage}
				pageID={4}
				setID={setID}
			/>
		</section>
	);
};

export default OrderWrapper;
