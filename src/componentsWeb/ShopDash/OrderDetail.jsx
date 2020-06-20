import React, { useState } from "react";
import DatePicker from "react-datepicker";
import InputDash from "./Form/InputDash";
import OptionsDash from "./Form/OptionsDash";
import TextAreaDash from "./Form/TextAreaDash";
import UploadFileDash from "./Form/UploadFileDash";

const OrderDetail = () => {
	const [isEdit, setIsEdit] = useState(false);
	const [startDate, setStartDate] = useState(new Date());

	const options = ["Pending", "Processing", "Ordered"];

	const toggleEdit = () => setIsEdit(!isEdit);

	const onSubmit = (event) => event.preventDefault();

	const handleChangeDate = (date) => setStartDate(date);

	return (
		<form className="orderDetail" onSubmit={onSubmit}>
			<InputDash
				type="text"
				name="order"
				value="1"
				labelName="Order"
				disabled
			/>
			<InputDash
				type="text"
				name="name"
				placeHolder="Name"
				labelName="Name"
				disabled={!isEdit}
			/>
			{/* <InputDash
				type="date"
				name="name"
				labelName="Purchased On"
				value="20/10/2020"
				disabled={!isEdit}
			/> */}

			<div>
				<p>Purchased On</p>
				<DatePicker
					selected={startDate}
					className="form-group"
					disabled={!isEdit}
					onChange={handleChangeDate}
				/>
			</div>

			<InputDash
				type="text"
				name="customer"
				placeHolder="Customer"
				labelName="Customer"
				value="Someone"
				disabled={!isEdit}
			/>
			<InputDash
				type="text"
				name="customer"
				placeHolder="Customer"
				labelName="Ship to"
				value="Someone"
				disabled={!isEdit}
			/>

			<InputDash
				type="text"
				name="basePrice"
				placeHolder="Base Price"
				labelName="Base Price"
				disabled={!isEdit}
			/>
			<InputDash
				type="text"
				name="purchasedPrice"
				placeHolder="Purchased Price"
				labelName="Purchased Price"
				disabled={!isEdit}
			/>

			<UploadFileDash />

			<InputDash
				type="text"
				name="location"
				placeHolder="Location"
				labelName="City"
				disabled={!isEdit}
			/>

			<OptionsDash
				name="orderStatus"
				options={options}
				disabled={!isEdit}
			/>

			<TextAreaDash id="TextArea" name="Note" disabled={!isEdit} />
			{(isEdit && (
				<React.Fragment>
					<button type="submit" className="btn btn-success mr-2">
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
					>
						Edit
					</button>
					<button className="btn btn-light">Delete</button>
				</React.Fragment>
			)}
		</form>
	);
};

export default OrderDetail;
