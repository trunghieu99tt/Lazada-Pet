import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../axios";
import InputDash from "../../../componentsDash/ShopDash/Form/InputDash";
import OptionsDash from "../../../componentsDash/ShopDash/Form/OptionsDash";
import Loader1 from "../../../componentsWeb/SmallComponents/Loader1";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { orderStatusOptions } from "../../../variables";

const ItemDetail = ({ id, setCurrentPage }) => {
	const [itemInfo, setOrderInfo] = useState(null);
	const [isEdit, setIsEdit] = useState(false);
	const [accessToken] = useLocalStorage("accessToken", null);
	const [loading, setLoading] = useState(false);

	const options = Object.keys(orderStatusOptions);

	const [page, setPage] = useState(1);
	const pageSize = 5;
	const currentUser = useSelector((state) => state.user.currentUser);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const response = await axios.get(`/orders/${id}/`);
		const productsResponse = await axios.get("/products/");
		const userResponse = await axios.get("/customers/");

		const allProducts = productsResponse?.data || [];
		const allCustomers = userResponse?.data || [];

		const currentOrder = response?.data;

		const product =
			allProducts?.length > 0 &&
			allProducts.find((e) => e.id === currentOrder.productId);
		const customer =
			allCustomers?.length > 0 &&
			allCustomers.find((e) => e.id === currentOrder.customerId);

		// console.log("product", product);

		const newData = {
			...currentOrder,
			imageURL: product?.productImage,
			productType: product?.productType,
			name: product?.name,
			customerName: customer?.fullname || "",
		};

		setOrderInfo(newData);
	};

	const toggleEdit = () => setIsEdit(!isEdit);

	const onFieldChange = (event) => {
		const newItemInfo = {
			...itemInfo,
			[event.target.name]: event.target.value,
		};
		setOrderInfo(newItemInfo);
	};

	const onChangeDate = (date, dateString) => {
		const newItemInfo = {
			...itemInfo,
			purchasedOn: dateString,
		};
		setOrderInfo(newItemInfo);
	};

	const onChangeOptions = (event) => {
		const newItemInfo = {
			...itemInfo,
			status: orderStatusOptions[event.target.value],
		};

		setOrderInfo(newItemInfo);
	};

	const onEditData = async () => {
		try {
			const postItem = { ...itemInfo };
			if (postItem?.imageURL) {
				delete postItem.imageURL;
			}

			setLoading(true);

			const response = await axios.put(`/orders/${id}/`, postItem, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			setLoading(false);
			message.success("Edited Successfully");
			toggleEdit();
		} catch (error) {}
	};

	// Config Data

	if (!itemInfo || loading) return <Loader1 />;

	const { name, address, customerName, price, status } = itemInfo;
	const values = Object.entries(orderStatusOptions);
	const filteredValue = values.find(
		(item) => item && item.length > 1 && item[1] === status
	);

	return (
		<div className="itemDetail">
			<InputDash
				type="text"
				name="itemID"
				value={id}
				labelName="Order"
				disabled
			/>
			<InputDash
				type="text"
				name="name"
				placeHolder="Name"
				labelName="Name"
				value={name}
				disabled
			/>

			{/* <div className="form-group">
				<p>Purchased On</p>
				<DatePicker
					defaultValue={moment(purchasedOn, "DD/MM/YYYY")}
					format="DD/MM/YYYY"
					disabled={!isEdit}
					onChange={onChangeDate}
				/>
			</div> */}

			<InputDash
				type="text"
				name="customer"
				placeHolder="Customer"
				labelName="Customer"
				value={customerName}
				disabled
			/>
			<InputDash
				type="text"
				name="shipTo"
				placeHolder="Ship To"
				labelName="Ship to"
				value={address}
				disabled
			/>

			<InputDash
				type="text"
				name="purchasedPrice"
				placeHolder="Purchased Price"
				labelName="Purchased Price"
				value={price}
				disabled
			/>

			<OptionsDash
				name="status"
				options={options}
				disabled={!isEdit}
				value={status}
				onChange={onChangeOptions}
				defaultValue={filteredValue?.[0]}
			/>

			<InputDash
				id="TextArea"
				name="description"
				disabled={!isEdit}
				onChange={onFieldChange}
			/>
			{(isEdit && (
				<React.Fragment>
					<button
						type="submit"
						className="btn btn-success mr-2"
						onClick={onEditData}
					>
						Save
					</button>
					<button className="btn btn-light" onClick={toggleEdit}>
						{" "}
						Cancel
					</button>
				</React.Fragment>
			)) || (
				<React.Fragment>
					<button
						className="btn btn-success mr-2"
						onClick={toggleEdit}
						type="button"
					>
						Edit
					</button>
					{/* <button
						className="btn btn-light"
						type="button"
						onClick={() => {}}
					>
						Delete
					</button> */}
					<button
						className="btn btn-light"
						onClick={() => setCurrentPage(3)}
					>
						Back
					</button>
				</React.Fragment>
			)}
		</div>
	);
};

export default ItemDetail;
