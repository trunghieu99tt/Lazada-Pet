import { message } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import InputDash from "../../../componentsDash/ShopDash/Form/InputDash";
import FormInput from "../../../componentsWeb/SmallComponents/Form/FormInput";
import Loader1 from "../../../componentsWeb/SmallComponents/Loader1";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { API_URL_3 } from "../../../variables";

const ProductDashDetail = ({ item, id, setCurrentPage }) => {
	const [itemInfo, setItemInfo] = useState(item);
	const [isEdit, setIsEdit] = useState(false);
	const [accessToken] = useLocalStorage("accessToken", null);
	const [loading, setLoading] = useState(false);
	const [avatar, setAvatar] = useState({
		avatar: null,
		avatarPreview: null,
	});

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
		event.preventDefault();
		try {
			const putData = new FormData();
			const values = itemInfo && Object.entries(itemInfo);

			values.forEach((item) => {
				if (item[0] !== "productImage") {
					putData.append(item[0], item[1]);
				}
			});

			if (avatar?.avatar) {
				putData.append("productImage", avatar.avatar);
			}

			setLoading(true);

			const response = await axios.put(
				`${API_URL_3}/products/${id}/`,
				putData,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response?.data) {
				setItemInfo(response?.data);
			}
			message.success("Successfully updated");
			setLoading(false);
			setAvatar({
				avatarPreview: null,
				avatar: null,
			});
			toggleEdit();
		} catch (error) {
			message.error(error);
		}
	};

	const onFieldChange = (event, file = false) => {
		if (!file) {
			const { name, value } = event.target;

			const newItemInfo = {
				...itemInfo,
				[name]: value,
			};
			setItemInfo(newItemInfo);
		} else {
			const file = event.target.files[0];
			setAvatar({
				avatar: file,
				avatarPreview: URL.createObjectURL(file),
			});
		}
	};

	const onDeleteItem = async () => {
		try {
			setLoading(true);

			const response = await axios.delete(
				`${API_URL_3}/products/${id}/`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			setLoading(false);
			message.success("Deleted Successfully");
			setCurrentPage(1);
		} catch (error) {
			message.error(error);
		}
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

	// console.log("itemInfo", itemInfo);

	if (loading) return <Loader1 />;

	return (
		<div className="itemDetail" onSubmit={onSubmit}>
			<div className="row justify-content-between">
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

				{isEdit && (
					<React.Fragment>
						<FormInput
							type="file"
							handleChange={(event) => onFieldChange(event, true)}
							name="productImage"
							label="Product Image"
						/>

						{avatar?.avatarPreview && (
							<figure className="userMainEditInfo__avatar">
								<img
									src={avatar.avatarPreview || ""}
									alt={"pt"}
								/>
							</figure>
						)}
					</React.Fragment>
				)}
			</div>

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

			{/* <InputDash
				type="text"
				name="rate"
				placeHolder="Rate"
				labelName="Rate"
				value={rate}
				disabled
			/> */}
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
						onClick={onDeleteItem}
					>
						Delete
					</button>
					<button
						className="btn btn-light"
						onClick={() => setCurrentPage(1)}
					>
						Back
					</button>
				</React.Fragment>
			)}
		</div>
	);
};

export default ProductDashDetail;
