import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios";
import FormInput from "../../../componentsWeb/SmallComponents/Form/FormInput";
import Loader1 from "../../../componentsWeb/SmallComponents/Loader1";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { API_URL_3 } from "../../../variables";

const ShopInfo = ({ setCurrentPage, setID }) => {
	const [data, setData] = useState(null);
	const [avatarData, setAvatar] = useState({
		avatar: null,
		avatarPreview: null,
	});
	const [isEditting, setIsEditting] = useState(false);
	const currentUser = useSelector((state) => state.user.currentUser);
	const [accessToken] = useLocalStorage("accessToken", null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (currentUser) {
			getCustomerData();
		}
	}, []);

	const getCustomerData = async () => {
		console.log("currentUser", currentUser);

		try {
			const response = await axios.get(`/shops/${currentUser.id}`);
			const data = response?.data || [];
			setData(data);
		} catch (error) {
			message.error(error);
		}
	};

	const onChangeHandler = (event, file = false) => {
		if (!file) {
			const { name, value } = event.target;
			setData({
				...data,
				[name]: value,
			});
		} else {
			const file = event.target.files[0];
			setAvatar({
				avatar: file,
				avatarPreview: URL.createObjectURL(file),
			});
		}
	};

	const resetData = () => setData(currentUser);

	const displaySuccess = () => {
		message.success("Edit data successful");
	};

	const displayError = (err) => {
		message.error(err);
	};

	const confirm = () => {
		Modal.confirm({
			title: "Confirm",
			content: "Save Info?",
			okText: "Yes",
			cancelText: "No",
			onOk: updateData,
		});
	};

	const errorModal = () => {
		Modal.error({
			title: "Data is not correct",
			icon: <FontAwesomeIcon icon={faExclamationCircle} />,
			content: "One or more field are not valid. Please check again",
		});
	};

	const validateData = () => {
		const values = Object.entries(data);
		return !values.filter((item) => !item[1] || !item[1].length).length;
	};

	const submitHandler = async () => {
		// if (validateData()) {
		confirm();
		// } else {
		// errorModal();
		// }
	};

	const updateData = async () => {
		const postData = new FormData();
		const values = Object.entries(data).filter(
			(item) => item[1] && item[0] !== "avatar"
		);

		values && values.forEach((item) => postData.append(item[0], item[1]));

		if (avatarData?.avatar) {
			postData.append("avatar", avatarData.avatar);
		}

		try {
			// const response = await axios.get(
			// 	`https://cors-anywhere.herokuapp.com/${API_URL_2}/customers`
			// );
			const response = await axios.put(
				`${API_URL_3}/shops/${data?.id}/`,
				postData,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			displaySuccess();
			setIsEditting(false);
			dispatch({ type: "SET_CURRENT_USER", payload: data });
		} catch (error) {
			displayError(error);
		}
	};

	if (!data) return <Loader1 />;

	const {
		username,
		email,
		phone,
		avatar,
		businessLisence,
		address,
		warehouseAddress,
	} = currentUser;

	return (
		<div className="content-wrapper shopInfo">
			<div className="row align-items-start">
				<div className="col-lg-4 side-left d-flex">
					<div
						className="card"
						style={{
							width: "100%",
						}}
					>
						<div className="card-body text-center">
							<h1 className="card-title">Info</h1>
							<img
								src={avatar}
								alt={username}
								className="shopInfo__avatar"
							/>
							<h1 className="shopInfo__name">{username}</h1>
							<div className="d-flex justify-content-between text-center text-dark shopInfo__info">
								<p>Email</p>
								<strong>{email || ""}</strong>
							</div>
							<div className="d-flex justify-content-between text-center text-dark shopInfo__info">
								<p>Phone Number</p>
								<strong>{phone || ""}</strong>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-8 side-right stretch-card">
					<div className="card">
						<div className="card-body">
							<div className="wrapper d-block d-sm-flex align-items-center justify-content-between">
								<h1 className="card-title mb-0">Details</h1>
								{/* <ul className="nav nav-tabs tab-solid tab-solid-primary mb-0">
									<li className="nav-item">Info</li>
									<li className="nav-item">Security</li>
								</ul> */}
							</div>

							<div className="wrapper">
								<div className="tab-content">
									<div className="tab-pane fade active show">
										<div>
											{isEditting && (
												<div className="row justify-content-between">
													<figure className="userMainEditInfo__avatar">
														<img
															src={
																currentUser?.avatar ||
																""
															}
															alt={`${currentUser?.username} avatar`}
														/>
													</figure>

													<FormInput
														label="Avatar"
														name="avatar"
														type="file"
														id={avatar}
														onChange={(event) =>
															onChangeHandler(
																event,
																true
															)
														}
													/>
													{avatarData?.avatarPreview && (
														<figure className="userMainEditInfo__avatar">
															<img
																src={
																	avatarData?.avatarPreview ||
																	""
																}
																alt={`${currentUser?.username} avatar`}
															/>
														</figure>
													)}
												</div>
											)}

											<div className="form-group">
												<label
													for="businessLisence"
													className="shopInfo__inputLabel"
												>
													Business Lisence
												</label>
												<input
													name="businessLicense"
													type="text"
													className="form-control shopInfo__input"
													id={businessLisence}
													value={businessLisence}
													disabled={!isEditting}
													onChange={onChangeHandler}
												/>
											</div>

											<div className="form-group">
												<label
													for="phone"
													className="shopInfo__inputLabel"
												>
													Phone Number
												</label>
												<input
													name="phone"
													type="text"
													className="form-control shopInfo__input"
													id={phone}
													value={phone}
													disabled={!isEditting}
													onChange={onChangeHandler}
												/>
											</div>

											<div className="form-group">
												<label
													for="address"
													className="shopInfo__inputLabel"
												>
													Address
												</label>
												<input
													name="address"
													type="text"
													className="form-control shopInfo__input"
													id={address}
													value={address}
													disabled={!isEditting}
													onChange={onChangeHandler}
												/>
											</div>

											<div className="form-group">
												<label
													for="warehouseAddress"
													className="shopInfo__inputLabel"
												>
													Warehouse Address
												</label>
												<input
													name="warehouseAddress"
													type="text"
													className="form-control shopInfo__input"
													id={warehouseAddress}
													value={warehouseAddress}
													disabled={!isEditting}
													onChange={onChangeHandler}
												/>
											</div>

											<div className="form-group">
												<label
													for="email"
													className="shopInfo__inputLabel"
												>
													Email
												</label>
												<input
													name="email"
													type="text"
													className="form-control shopInfo__input"
													id={email}
													value={email}
													disabled={!isEditting}
													onChange={onChangeHandler}
												/>
											</div>

											<div className="form-group mt-5">
												{!isEditting && (
													<button
														type="submit"
														className="btn btn-success mr-2"
														onClick={() =>
															setIsEditting(true)
														}
													>
														Edit
													</button>
												)}

												{isEditting && (
													<React.Fragment>
														<button
															type="submit"
															className="btn btn-success mr-2"
															disabled={
																!isEditting
															}
															onClick={
																submitHandler
															}
														>
															Update
														</button>

														<button
															className="btn btn-outline-danger"
															onClick={() => {
																setIsEditting(
																	false
																);
																resetData();
															}}
														>
															Cancel
														</button>
													</React.Fragment>
												)}
											</div>
										</div>
									</div>

									<div className="tab-pane fade">
										<form action="#">
											<div className="form-group">
												<label for="change-password">
													Change password
												</label>
												<input
													type="password"
													className="form-control"
													id="change-password"
													placeholder="Enter you current password"
												/>
											</div>
											<div className="form-group">
												<input
													type="password"
													className="form-control"
													id="new-password"
													placeholder="Enter you new password"
												/>
											</div>
											<div className="form-group mt-5">
												<button
													type="submit"
													className="btn btn-success mr-2"
												>
													Update
												</button>
												<button className="btn btn-outline-danger">
													Cancel
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShopInfo;
