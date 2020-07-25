import { message } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../axios";
import CustomButton from "../SmallComponents/Buttons/FormButton";
import FormInput from "../SmallComponents/Form/FormInput";
import RadioButton from "../SmallComponents/Form/RadioButton";

const Register = (props) => {
	const [state, setState] = useState({
		username: "",
		email: "",
		password: "",
		passwordConfirm: "",
		fullname: "",
		address: "",
		mobile: "",
		warehouseAddress: "",
		shopOwner: "",
		bankAccount: "",
		isShop: false,
		pictures: [],
		avatarPreview: null,
		avatar: null,
	});

	const history = useHistory();
	const { openLogin } = props;

	const handleSubmit = async (event) => {
		event.preventDefault();

		const { password, passwordConfirm } = state;

		if (password !== passwordConfirm) {
			message.error("passwords don't match");
			return;
		} else {
			const endPoint = isShop === "true" ? "shops" : "customers";
			const data = new FormData();
			const values = Object.entries(state);

			values.forEach((item) => {
				data.append(item[0], item[1]);
			});

			try {
				const response = await axios.post(`/${endPoint}/`, data);
				openLogin();
			} catch (err) {
				message.error(err);
			}
		}
	};

	const handleChange = (event, file = false) => {
		const { value, name } = event.target;
		if (file) {
			setState({
				...state,
				avatar: event.target.files[0],
				avatarPreview: URL.createObjectURL(event.target.files[0]),
			});
		} else {
			setState({ ...state, [name]: value });
		}
	};

	const {
		email,
		password,
		fullname,
		passwordConfirm,
		mobile,
		isShop,
		address,
		warehouseAddress,
		shopOwner,
		bankAccount,
		avatar,
		avatarPreview,
		username,
	} = state;

	return (
		<div className="login-form">
			<h3 className="component-heading">Register</h3>

			<form onSubmit={handleSubmit}>
				<FormInput
					name="email"
					type="email"
					handleChange={handleChange}
					value={email}
					label="Email"
					required
				/>
				<FormInput
					name="username"
					type="text"
					handleChange={handleChange}
					value={username}
					label="Username"
					required
				/>

				<FormInput
					name="password"
					type="password"
					value={password}
					handleChange={handleChange}
					label="Password"
					required
				/>
				<FormInput
					name="passwordConfirm"
					type="password"
					value={passwordConfirm}
					handleChange={handleChange}
					label="PasswordConfirm"
					required
				/>

				<FormInput
					name="mobile"
					type="text"
					value={mobile}
					handleChange={handleChange}
					label="Mobile"
				></FormInput>

				<FormInput
					name="address"
					type="text"
					value={address}
					handleChange={handleChange}
					label="Address"
				></FormInput>

				<FormInput
					name="fullname"
					type="text"
					value={fullname}
					handleChange={handleChange}
					label="FullName"
				></FormInput>

				<FormInput
					name="bankAccount"
					type="text"
					value={bankAccount}
					handleChange={handleChange}
					label="Bank Account Number"
				></FormInput>

				<FormInput
					name="avatar"
					type="file"
					handleChange={(event) => handleChange(event, true)}
					label="Avatar"
				></FormInput>

				{avatar && (
					<figure>
						<img src={avatarPreview} alt="avatar-preview" />
					</figure>
				)}

				<div className="checkbox" onChange={handleChange}>
					<RadioButton
						name="isShop"
						label="Shop"
						id="shop"
						value="true"
					/>
					<RadioButton
						name="isShop"
						label="Normal User"
						id="user"
						value="false"
					/>
				</div>

				{isShop === "true" && (
					<React.Fragment>
						<FormInput
							name="warehouseAddress"
							type="text"
							value={warehouseAddress}
							handleChange={handleChange}
							label="Warehouse Address"
						></FormInput>
						<FormInput
							name="shopOwner"
							type="text"
							value={shopOwner}
							handleChange={handleChange}
							label="shopOwner"
						></FormInput>
					</React.Fragment>
				)}

				<div className="buttons">
					<CustomButton type="submit"> Sign in </CustomButton>
				</div>

				<p className="form-footer-text">
					Already had an account ?
					<span onClick={openLogin}>Login now!</span>
				</p>
			</form>
		</div>
	);
};

export default Register;
