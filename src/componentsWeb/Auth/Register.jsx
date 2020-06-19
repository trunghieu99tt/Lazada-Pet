import { message } from "antd";
import React from "react";
import {
	auth,
	createUserProfileDocument,
	signInWithGoogle,
} from "../../firebase/firebase.utils";
import CustomButton from "../SmallComponents/Buttons/FormButton";
import FormInput from "../SmallComponents/Form/FormInput";
import RadioButton from "../SmallComponents/Form/RadioButton";

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			passwordConfirm: "",
			name: "",
			address: "",
			mobile: "",
			isShop: false,
		};
	}

	handleSubmit = async (event) => {
		event.preventDefault();

		const {
			name,
			email,
			password,
			passwordConfirm,
			address,
			mobile,
			isShop,
		} = this.state;

		console.log(this.state);

		if (password !== passwordConfirm) {
			message.error("passwords don't match");
			return;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			console.log("user", user);

			const modifiedUser = {
				...user,
				displayName: name,
				phoneNumber: mobile,
				address
			};

			console.log("modifiedUser", modifiedUser);

			await createUserProfileDocument(modifiedUser, { name });

			this.setState(
				{
					email: "",
					password: "",
					passwordConfirm: "",
					name: "",
					address: "",
					mobile: "",
					isShop: false,
				},
				() => console.log(this.state)
			);
		} catch (error) {
			console.error(error);
		}
	};

	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		const { openLogin } = this.props;
		const { email, password, name, passwordConfirm, mobile } = this.state;

		return (
			<div className="login-form">
				<h3 className="component-heading">Register</h3>

				<form onSubmit={this.handleSubmit}>
					<FormInput
						name="email"
						type="email"
						handleChange={this.handleChange}
						value={email}
						label="email"
						required
					/>
					<FormInput
						name="password"
						type="password"
						value={password}
						handleChange={this.handleChange}
						label="password"
						required
					/>
					<FormInput
						name="passwordConfirm"
						type="password"
						value={passwordConfirm}
						handleChange={this.handleChange}
						label="passwordConfirm"
						required
					/>

					<FormInput
						name="mobile"
						type="text"
						value={mobile}
						handleChange={this.handleChange}
						label="Mobile"
					></FormInput>

					<FormInput
						name="name"
						type="text"
						value={name}
						handleChange={this.handleChange}
						label="Name"
					></FormInput>

					<div className="checkbox" onChange={this.handleChange}>
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

					<div className="buttons">
						<CustomButton type="submit"> Sign in </CustomButton>
						<CustomButton isGoogleSignIn onClick={signInWithGoogle}>
							Sign in with Google
						</CustomButton>
					</div>

					<p className="form-footer-text">
						Already have an account ?
						<span onClick={openLogin}>Login now!</span>
					</p>
				</form>
			</div>
		);
	}
}

export default Register;
