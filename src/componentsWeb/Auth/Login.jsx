import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "../../axios";
import { useLocalStorage } from "../../hooks/useLocalStorage";
// import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import CustomButton from "../SmallComponents/Buttons/FormButton";
import FormInput from "../SmallComponents/Form/FormInput";

const Login = ({ openRegister }) => {
	const [state, setState] = useState({
		username: "",
		password: "",
	});
	const [refreshToken, setRefreshToken] = useLocalStorage(
		"refreshToken",
		null
	);

	const dispatch = useDispatch();
	const history = useHistory();
	const userData = useSelector((state) => state.user.currentUser);

	useEffect(() => {
		if (userData) {
			history.push("/");
		}
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { password, username } = state;

		try {
			const tokens = await axios.post(`/auth/jwt/create/`, {
				username,
				password,
			});

			if (tokens) {
				const { access, refresh } = tokens && tokens.data;
				setRefreshToken(refresh);
				const userResponse = await axios.get(`/auth/users/me/`, {
					headers: {
						Authorization: `Bearer ${access}`,
					},
				});

				const user = userResponse?.data;

				if (user) {
					let currentUser = {};
					if (user.isShop) {
						const shopResponse = await axios.get("/shops/");
						const shopsData = shopResponse?.data;

						currentUser = shopsData.find(
							(item) => item.username === user.username
						);
					} else {
						const userResponse = await axios.get("/customers/");
						const usersData = userResponse?.data;
						currentUser = usersData.find(
							(item) => item.username === user.username
						);
					}

					const final = {
						...currentUser,
						isShop: user.isShop,
					};

					setCurrentUser(final);
					history.push("/");
				}
			} else {
				message.error("Wrong username or password, please check again");
			}
		} catch (error) {}
	};

	const handleChange = (event) => {
		const { value, name } = event.target;
		setState({ ...state, [name]: value });
	};

	const setCurrentUser = (info) => {
		dispatch({ type: "SET_CURRENT_USER", payload: info });
	};

	const { password, username } = state;

	return (
		<div className="login-form">
			<h3 className="component-heading">Login</h3>

			<form onSubmit={handleSubmit}>
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
				<div className="d-flex align-items-center buttons">
					<CustomButton type="submit"> Sign in </CustomButton>

					<button className="ml-3">Forget Your Password ?</button>

					{/* <CustomButton isGoogleSignIn onClick={signInWithGoogle}>
                        Sign in with Google
                    </CustomButton> */}
				</div>

				<p className="form-footer-text">
					Doesn't have an account?{" "}
					<span onClick={openRegister}>Register here!</span>
				</p>
			</form>
		</div>
	);
};

export default Login;
