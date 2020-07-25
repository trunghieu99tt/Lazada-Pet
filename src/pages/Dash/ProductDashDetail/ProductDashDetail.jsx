import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import InputDash from "../../../componentsDash/ShopDash/Form/InputDash";
import Loader1 from "../../../componentsWeb/SmallComponents/Loader1";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

const ProductDashDetail = ({ item, resetItem, deleteItem, id }) => {
	const [itemInfo, setItemInfo] = useState(item);
	const [isEdit, setIsEdit] = useState(false);
	const [accessToken] = useLocalStorage("accessToken", null);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const response = await axios.get(`/products/${id}`);
		const product = response?.data;
		setItemInfo(product);
	};

	// const options = ["Unavailable", "Out of Stock", "Available"];

	const toggleEdit = () => setIsEdit(!isEdit);

	const onSubmit = async (event) => {
		console.log("Clicked");
		event.preventDefault();
		const response = await axios.patch(`/products/${id}/`, itemInfo, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		console.log("response", response);
	};

	const onFieldChange = (event) => {
		const { name, value } = event.target;

		const newItemInfo = {
			...itemInfo,
			[name]: value,
		};
		setItemInfo(newItemInfo);
	};

	// const onChangeDate = (date, dateString) => {
	// 	const newItemInfo = {
	// 		...itemInfo,
	// 		purchasedOn: dateString,
	// 	};
	// 	setItemInfo(newItemInfo);
	// };

	// const onChangeOptions = (event) => {
	// 	const newItemInfo = {
	// 		...itemInfo,
	// 		status: event.target.value,
	// 	};

	// 	setItemInfo(newItemInfo);
	// };

	if (!itemInfo) return <Loader1 />;

	const {
		name,
		price,
		description,
		rate,
		amount,
		productImage: imageURL,
	} = itemInfo;

	console.log("itemInfo", itemInfo);

	const dataFields = itemInfo && Object.entries(itemInfo);

	return (
		<div className="itemDetail" onSubmit={onSubmit}>
			<figure>
				<img
					src={imageURL}
					alt={name}
					style={{
						maxHeight: "20rem",
						maxWidth: "20rem",
					}}
				/>
			</figure>

			<InputDash
				type="text"
				name="itemID"
				value={id}
				labelName="Product ID"
				disabled
			/>
			<InputDash
				type="text"
				name="name"
				placeHolder="Name"
				labelName="Name"
				value={name}
				disabled={!isEdit}
				onChange={onFieldChange}
			/>

			<InputDash
				type="number"
				name="price"
				placeHolder="Price"
				labelName="Price"
				value={Math.round(price)}
				disabled={!isEdit}
				onChange={onFieldChange}
			/>

			<InputDash
				type="number"
				name="amount"
				placeHolder="Amount"
				labelName="Amount"
				value={Math.round(amount)}
				disabled={!isEdit}
				onChange={onFieldChange}
			/>

			<InputDash
				type="text"
				name="rate"
				placeHolder="Rate"
				labelName="Rate"
				value={rate}
				disabled
			/>
			{/* 
			<InputDash
				name="status"
				options={options}
				disabled={!isEdit}
				value={status}
				onChange={onChangeOptions}
			/> */}

			{/* <InputDash
				type="text"
				placeHolder="Short Description"
				labelName="Short Description"
				value={shortDescription}
				name="shotDescription"
				disabled={!isEdit}
				onChange={onFieldChange}
			/> */}
			<InputDash
				type="text"
				placeHolder="Description"
				labelName="Description"
				value={description}
				name="description"
				disabled={!isEdit}
				onChange={onFieldChange}
			/>

			{(isEdit && (
				<React.Fragment>
					<button
						type="submit"
						className="btn btn-success mr-2"
						onClick={onSubmit}
					>
						Submit
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
					<button
						className="btn btn-light"
						type="button"
						onClick={() => {
							deleteItem(itemInfo);
							resetItem();
						}}
					>
						Delete
					</button>
					<button className="btn btn-light" onClick={resetItem}>
						Back
					</button>
				</React.Fragment>
			)}
		</div>
	);
};

export default ProductDashDetail;
