import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../axios";
import DataTable from "../../../CommonComponents/Tables/DataTable/DataTable";
import { tableHeadData } from "./product-tableHead.data";

const ProductDash = ({ allProducts, setCurrentPage, setID, ...otherProps }) => {
	const [data, setData] = useState([]);
	const currentUser = useSelector((state) => state.user.currentUser);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const productResponse = await axios.get(`/products`);
		const shopResponse = await axios.get("/shops");
		const products = productResponse?.data || []; // Có shopId
		const shops = shopResponse?.data || []; // có id của các shop

		const currentShop = shops.find(
			(item) => item.username === currentUser.username
		);
		const shopID = currentShop?.id;
		const filteredData = products?.filter((item) => item.shopId === shopID);

		setData(filteredData);
	};

	const searchFields = [
		{ name: "By Product name", attribute: "name" },
		{ name: "By Product ID", attribute: "productID" },
	];
	const badges = [
		["Unavailable", "badge-danger"],
		["Out of stock", "badge-info"],
		["Available", "badge-success"],
	];
	const statusOptions = ["All", "Available", "Unavailable", "Out of stock"];

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
	const categoriesFilter = (event, dataSample) => {
		const category = event.target.value;
		let finalResult = [...dataSample];
		if (category !== "All") {
			const filterData =
				data?.length &&
				data.filter((e) => e.categories.includes(category));
			finalResult = [...filterData];
		}
		return finalResult;
	};

	return (
		<div className="shopDash-products-wrapper">
			<DataTable
				dataSample={data}
				deleteEntry={deleteItem}
				tableHeadData={tableHeadData}
				tableName="Products"
				statusFilter={categoriesFilter}
				badges={badges}
				options={statusOptions}
				searchFields={searchFields}
				prefix="product"
				existDateRange
				pageID={2}
				setCurrentPage={setCurrentPage}
				setID={setID}
			/>
		</div>
	);
};

export default ProductDash;
