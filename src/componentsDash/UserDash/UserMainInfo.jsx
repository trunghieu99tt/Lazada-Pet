import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios";
import Loader1 from "../../componentsWeb/SmallComponents/Loader1";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { dateConverter } from "../../utils/helper";
import { genderOptions } from "../../variables";

const UserMainInfo = ({ setCurrentPage, setID }) => {
	const [data, setData] = useState(null);
	const currentUser = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();
	const [accessToken] = useLocalStorage("accessToken");

	useEffect(() => {
		if (currentUser) {
			getCustomerData();
		}
	}, []);

	const getCustomerData = async () => {
		const username = currentUser && currentUser.username;
		try {
			// const response = await axios.get(
			// 	`https://cors-anywhere.herokuapp.com/${API_URL_2}/customers`
			// );

			const response = await axios.get(`/customers`);

			const data = response?.data || [];

			const userData =
				data?.length > 0 &&
				data.find((item) => item.username === username);
			setData(userData);
			dispatch({ type: "SET_CURRENT_USER", payload: userData });
		} catch (error) {
			message.error(error);
		}
	};

	if (!data) return <Loader1 />;

	console.log("data", data);

	const {
		fullname,
		dateOfBirth,
		gender,
		username,
		email,
		phone,
		address,
	} = data;

	const mapValue = Object.entries(genderOptions);
	const filtedValue = mapValue.find((item) => item[1] === gender);
	const genderValue = filtedValue?.[0] || "Unknown";

	return (
		<section className="userMainInfo">
			<div className="row justify-content-around">
				<div className="group-container">
					<h3 className="userMainInfo__heading">
						User's Information
					</h3>
					<p className="userMainInfo__text">
						<span>Fullname: </span> {fullname}
					</p>
					<p className="userMainInfo__text">
						<span>Date of birth:</span>{" "}
						{(dateOfBirth && dateConverter(dateOfBirth)) || ""}
					</p>
					<p className="userMainInfo__text">
						<span>Gender: </span> {genderValue}
					</p>
					<p className="userMainInfo__text">
						{" "}
						<span>Username: </span> {username}
					</p>
					<p className="userMainInfo__text">
						<span>Email: </span> {email}
					</p>
					<p className="userMainInfo__text">
						<span>Phone: </span> {phone}
					</p>
				</div>

				<div className="group-container">
					<h3 className="userMainInfo__heading">Address</h3>
					<p className="userMainInfo__text">
						<strong>{fullname}</strong>
					</p>
					<p className="userMainInfo__text">{address}</p>

					<p>
						<strong>{phone}</strong>
					</p>
				</div>

				<button
					className="button--1"
					onClick={() => {
						setCurrentPage(1);
						setID(1);
					}}
				>
					Edit Info
				</button>
			</div>
		</section>
	);
};

export default UserMainInfo;
