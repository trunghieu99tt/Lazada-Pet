import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios";
import FormInput from "../../componentsWeb/SmallComponents/Form/FormInput";
import Loader1 from "../../componentsWeb/SmallComponents/Loader1";
import SelectBoxDash from "../../componentsWeb/SmallComponents/SelectBoxDash";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { encodeStr } from "../../utils/helper";
import { genderOptions } from "../../variables";

const UserMainEditInfo = ({ setCurrentPage }) => {
	const [data, setData] = useState(null);
	const [avatar, setAvatar] = useState({
		avatar: null,
		avatarPreview: null,
	});
	const [accessToken, setAccessToken] = useState(null);
	const currentUser = useSelector((state) => state.user.currentUser);
	const [refreshToken] = useLocalStorage("refreshToken", null);
	const dispatch = useDispatch();

	useEffect(() => {
		getData();
		getUserInfo();
	}, []);

	useEffect(() => {
		getData();
	}, [currentUser]);

	const sortData = (data) => data.sort((a, b) => a.order - b.order);

	const displaySuccess = () => {
		message.success("Edit data successful");
	};

	const displayError = (err) => {
		message.error(err);
	};

	const getData = async () => {
		const {
			fullname,
			gender,
			dateOfBirth,
			email,
			phone,
			address,
		} = currentUser;

		const modifiedData = sortData([
			{
				order: 1,
				fieldName: "fullname",
				name: "Full name",
				value: fullname,
				type: "text",
				isRequired: true,
			},
			{
				order: 2,
				fieldName: "gender",
				name: "Gender",
				value: gender,
				type: "select",
				isRequired: true,
			},
			{
				order: 3,
				fieldName: "dateOfBirth",
				name: "Date Of Birth",
				value: dateOfBirth,
				type: "date",
				isRequired: true,
			},
			{
				order: 4,
				fieldName: "email",
				name: "Email",
				value: email,
				type: "email",
				isRequired: true,
			},
			{
				order: 5,
				fieldName: "phone",
				name: "Phone Number",
				value: phone,
				type: "text",
				isRequired: true,
			},
			{
				order: 6,
				fieldName: "address",
				name: "address",
				value: address,
				type: "text",
				isRequired: true,
			},
		]);

		setData(modifiedData);
	};

	const getUserInfo = async () => {
		try {
			const res = await axios.post(`/auth/jwt/refresh/`, {
				refresh: refreshToken,
			});
			const accessToken = res?.data?.access;
			setAccessToken(accessToken);
		} catch (error) {}
	};

	const transformData = () => {
		return data.reduce(
			(obj, item) => ({ ...obj, [item.fieldName]: item.value }),
			{}
		);
	};

	const handleChange = (event, file = false) => {
		const { name, value } = event.target;
		const othersData = data.filter((item) => encodeStr(item.name) !== name);
		const filteredData = data.find((item) => encodeStr(item.name) === name);
		if (!file) {
			const newData = sortData([
				...othersData,
				{
					...filteredData,
					value,
				},
			]);
			setData(newData);
		} else {
			const file = event.target.files[0];
			setAvatar({
				avatar: file,
				avatarPreview: URL.createObjectURL(file),
			});
		}
	};

	const validateData = () => {
		const values = data?.map((e) => e.value);
		const filteredValues = values.map((e) => !!e).filter(Boolean);

		return values.length === filteredValues.length;
	};

	const handleSubmit = () => {
		if (validateData()) {
			// confirm();
			updateData();
		} else {
			errorModal();
		}
	};

	const updateData = async () => {
		const newData = transformData();
		const postData = new FormData();
		const values = Object.entries(newData);

		values.forEach((item) => {
			if (item[0] !== "gender") {
				postData.append(item[0], item[1]);
			}
		});

		if (typeof newData.gender === "number") {
			postData.append("gender", newData.gender);
		} else {
			postData.append("gender", genderOptions[newData.gender]);
		}

		if (avatar?.avatar) {
			postData.append("avatar", avatar.avatar);
		}

		const id = currentUser?.id || -1;

		if (id) {
			try {
				await axios.put(`/customers/${id}/`, postData, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
				displaySuccess();
				setCurrentPage(0);
				dispatch({
					type: "SET_CURRENT_USER",
					payload: { ...currentUser, ...newData },
				});
			} catch (error) {
				displayError(error);
			}
		} else {
			message.error("Something went wrong. Please try again later");
		}
	};

	const confirm = () => {
		Modal.confirm({
			title: "Confirm",
			icon: <FontAwesomeIcon icon={faExclamationCircle} />,
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

	if (!data) return <Loader1 />;

	return (
		<section className="userMainEditInfo">
			<h3>Basic Information</h3>

			<div className="group-container">
				<div className="row justify-content-between">
					<figure className="userMainEditInfo__avatar">
						<img
							src={currentUser?.avatar || ""}
							alt={`${currentUser?.username} avatar`}
						/>
					</figure>

					<FormInput
						type="file"
						handleChange={(event) => handleChange(event, true)}
						name="avatar"
						label="Avatar"
					/>

					{avatar?.avatarPreview && (
						<figure className="userMainEditInfo__avatar">
							<img
								src={avatar.avatarPreview || ""}
								alt={`${currentUser?.username} avatar`}
							/>
						</figure>
					)}
				</div>

				{data &&
					data.map((item) => {
						const { name, type, value, isRequired } = item;

						if (type === "select") {
							const mapValue = Object.entries(genderOptions);
							const filtedValue = mapValue.find(
								(item) => item[1] === value
							);
							const initialValue = filtedValue?.[0] || "Male";

							return (
								<SelectBoxDash
									options={Object.keys(genderOptions)}
									onChangeHandler={handleChange}
									name="gender"
									defaultValue={initialValue}
									className="userMainEditInfo-selectBox"
									label="Gender"
								/>
							);
						}

						return (
							<FormInput
								name={encodeStr(name)}
								label={name}
								value={value}
								type={type}
								handleChange={handleChange}
								required={isRequired}
							/>
						);
					})}
				<button
					type="submit"
					className="button--1"
					onClick={handleSubmit}
				>
					Save
				</button>
			</div>
		</section>
	);
};

export default UserMainEditInfo;
