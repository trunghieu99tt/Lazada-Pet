import React, { useEffect, useState, useReducer } from "react";
import Axios from "axios";
import { API_URL_1 } from "../../variables";
import Loader1 from "../../componentsWeb/SmallComponents/Loader1";
import { dateConverter } from "../../utils/helper";
import { useSelector } from "react-redux";

const UserMainInfo = ({ setCurrentPage, setID }) => {
    const [data, setData] = useState(null);
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        setData(currentUser);
    }, []);

    if (!data) return <Loader1 />;

    const {
        id,
        fullname,
        avatar,
        dateOfBirth,
        gender,
        username,
        email,
        phone,
        address,
    } = data;

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
                        <span>Gender: </span> {gender}
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
