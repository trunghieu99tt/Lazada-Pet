import { DatePicker } from "antd";
import moment from "moment";
import React, { useState } from "react";
import InputDash from "./Form/InputDash";
import OptionsDash from "./Form/OptionsDash";
import TextAreaDash from "./Form/TextAreaDash";
import UploadFileDash from "./Form/UploadFileDash";


const OrderDetail = ({ order, resetOrder, handleEditItem }) => {
	const [orderInfo, setOrderInfo] = useState(order);
	const [isEdit, setIsEdit] = useState(false);

	const options = ["Pending", "Processing", "Completed"];

	const toggleEdit = () => setIsEdit(!isEdit);

	const onSubmit = (event) => {
		event.preventDefault();
		handleEditItem(orderInfo);
	};

	const onFieldChange = (event) => {
		const newOrderInfo = {
			...orderInfo,
			[event.target.name]: event.target.value,
		};
		setOrderInfo(newOrderInfo);
	};

	const onChangeDate = (date, dateString) => {
		const newOrderInfo = {
			...orderInfo,
			purchasedOn: dateString,
		};
		setOrderInfo(newOrderInfo);
	};

	const onChangeOptions = (event) => {
		const newOrderInfo = {
			...orderInfo,
			status: event.target.value,
		};
		setOrderInfo(newOrderInfo);
	};

	// Config Data

	const {
		orderID,
		name,
		purchasedOn,
		customer,
		shipTo,
		basePrice,
		purchasedPrice,
		status,
	} = orderInfo;

	return (
		<div className="orderDetail" onSubmit={onSubmit}>
			<InputDash
				type="text"
				name="orderID"
				value={orderID}
				labelName="Order"
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

			<div className="form-group">
				<p>Purchased On</p>
				<DatePicker
					defaultValue={moment(purchasedOn, "DD/MM/YYYY")}
					format="DD/MM/YYYY"
					disabled={!isEdit}
					onChange={onChangeDate}
				/>
			</div>

			<InputDash
				type="text"
				name="customer"
				placeHolder="Customer"
				labelName="Customer"
				value={customer}
				disabled={!isEdit}
				onChange={onFieldChange}
			/>
			<InputDash
				type="text"
				name="shipTo"
				placeHolder="Ship To"
				labelName="Ship to"
				value={shipTo}
				disabled={!isEdit}
				onChange={onFieldChange}
			/>

			<InputDash
				type="text"
				name="basePrice"
				placeHolder="Base Price"
				labelName="Base Price"
				value={basePrice}
				disabled={!isEdit}
				onChange={onFieldChange}
			/>
			<InputDash
				type="text"
				name="purchasedPrice"
				placeHolder="Purchased Price"
				labelName="Purchased Price"
				value={purchasedPrice}
				disabled={!isEdit}
				onChange={onFieldChange}
			/>

			<UploadFileDash />

			<OptionsDash
				name="status"
				options={options}
				disabled={!isEdit}
				value={status}
				onChange={onChangeOptions}
			/>

			<TextAreaDash id="TextArea" name="Note" disabled={!isEdit} />
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
					<button className="btn btn-light" type="button">
						Delete
					</button>
					<button className="btn btn-light" onClick={resetOrder}>
						Back
					</button>
				</React.Fragment>
			)}
		</div>
	);
};

export default OrderDetail;
