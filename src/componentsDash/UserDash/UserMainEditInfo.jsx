import React, { useState, useEffect } from "react";
import FormInput from "../../componentsWeb/SmallComponents/Form/FormInput";
import { API_URL_1, API_URL_2 } from "../../variables";
import Axios from "axios";
import Loader1 from "../../componentsWeb/SmallComponents/Loader1";
import { encodeStr } from "../../utils/helper";
import { message, Modal } from "antd";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const UserMainEditInfo = ({ setCurrentPage }) => {
    const [data, setData] = useState(null);
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
        console.log("currentUser", currentUser);

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
                type: "text",
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
            const res = await Axios.post(
                `${API_URL_2}/auth/jwt/refresh`,
                {
                    refresh: refreshToken,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        const othersData = data.filter((item) => encodeStr(item.name) !== name);
        const filteredData = data.find((item) => encodeStr(item.name) === name);
        const newData = sortData([
            ...othersData,
            {
                ...filteredData,
                value,
            },
        ]);
        setData(newData);
    };

    const validateData = () => {
        return data.indexOf((item) => !item.value) === -1;
    };

    const handleSubmit = () => {
        if (validateData()) {
            confirm();
        } else {
            errorModal();
        }
    };

    const updateData = async () => {
        const id = 1;
        const newData = transformData();

        try {
            await Axios.patch(`${API_URL_2}/auth/users/me/`, newData, {
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

    console.log("data", data);

    return (
        <section className="userMainEditInfo">
            <h3>Basic Information</h3>

            <div className="group-container">
                {data &&
                    data.map((item) => {
                        const { name, type, value, isRequired } = item;

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
