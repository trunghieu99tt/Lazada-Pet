import React, { useState, useEffect } from "react";
import Loader1 from "../../componentsWeb/SmallComponents/Loader1";
import Axios from "axios";
import { API_URL_1 } from "../../variables";
import { dateConverter } from "../../utils/helper";
import { Modal, message } from "antd";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserOrderDetail = ({ id, setCurrentPage }) => {
    const [orderData, setOrderData] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        getOrderData();
    }, [id]);

    const getOrderData = async () => {
        const response = await Axios.get(`${API_URL_1}/users/1/orders/${id}`);
        setOrderData(response?.data);
    };

    const getUserData = async () => {
        const userID = 1;
        const response = await Axios.get(`${API_URL_1}/users/${userID}`);
        setUserData(response?.data);
    };

    const displaySuccessMessage = () => message.success("Deleted Successful");

    const displayErrorMessage = (err) => message.error(err);

    const onConfirmDeleteOrder = async () => {
        try {
            await Axios.delete(`${API_URL_1}/users/1/orders/${id}`);
            displaySuccessMessage();
            setCurrentPage(2);
        } catch (error) {
            displayErrorMessage(error);
        }
    };

    const confirm = () => {
        Modal.confirm({
            title: "Confirm",
            icon: <FontAwesomeIcon icon={faExclamationCircle} />,
            content: "Are you sure to delete this order ?",
            okText: "Yes",
            cancelText: "No",
            onOk: onConfirmDeleteOrder,
        });
    };

    if (!userData || !orderData) return <Loader1 />;

    return (
        <section className="userOrderDetail">
            <div className="group-container userOrderDetail-top">
                <div className="row justify-content-between">
                    <p className="userOrderDetail__deliveryDate">
                        Delivery On: {dateConverter(orderData.deliveriedOn)}
                    </p>
                </div>

                <div className="row justify-content-between align-items-center">
                    <figure className="userOrderDetail__image-container">
                        <img
                            src={orderData.picture}
                            alt={orderData.name}
                            className="userOrderDetail__image"
                        />
                    </figure>
                    <p className="userOrderDetail__name">
                        <p className="userOrderDetail__fieldName">Name</p>
                        <p className="userOrderDetail__fieldValue">
                            {orderData.name}
                        </p>
                    </p>
                    <p className="userOrderDetail__price">
                        <p className="userOrderDetail__fieldName">Price</p>
                        <p className="userOrderDetail__fieldValue">
                            {orderData.price}$
                        </p>
                    </p>
                    <p className="userOrderDetail__amount">
                        <p className="userOrderDetail__fieldName">Amount</p>
                        <p className="userOrderDetail__fieldValue">
                            {" "}
                            {orderData.amount}
                        </p>
                    </p>
                    <p className="userOrderDetail__total">
                        <p className="userOrderDetail__fieldName">Total</p>
                        <p className="userOrderDetail__fieldValue">
                            {orderData.price * orderData.amount}$
                        </p>
                    </p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="group-container">
                        <h3>Shipping Address</h3>
                        <p>{userData.fullname}</p>
                        <p>{userData.address}</p>
                    </div>

                    <div className="group-container">
                        <h3>Billing Address</h3>
                        <p>{userData.fullname}</p>
                        <p>{userData.address}</p>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="group-container">
                        <h3>Total Summary</h3>
                        <div className="row justify-content-between">
                            <h3>Subtotal</h3>
                            <p className="userOrderDetail__fieldValue">
                                {orderData.price}$
                            </p>
                        </div>

                        <div className="row justify-content-between">
                            <h3>Shipping Fee</h3>
                            <p className="userOrderDetail__fieldValue">
                                {Math.round(orderData.price * 0.1)}$
                            </p>
                        </div>

                        <div className="row justify-content-between">
                            <h3>Total(VAT Incl.)</h3>
                            <p className="userOrderDetail__fieldValue">
                                {Math.round(
                                    orderData.price +
                                        Math.round(orderData.price * 0.1)
                                )}
                                $
                            </p>
                        </div>
                    </div>
                    <button
                        className="button--1 userOrderDetail__cancelOrder"
                        onClick={confirm}
                    >
                        Delete Order
                    </button>
                </div>
            </div>
        </section>
    );
};

export default UserOrderDetail;
