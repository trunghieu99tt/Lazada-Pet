import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL_1 } from "../../variables";
import Loader1 from "../../componentsWeb/SmallComponents/Loader1";
import { dateConverter } from "../../utils/helper";

const UserMainInfo = ({ setCurrentPage, setID }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await Axios({
            method: "GET",
            url: `${API_URL_1}/users/1`,
        });
        setData(response.data);
    };

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
            <h2>Basic Information</h2>

            <div className="row justify-content-around">
                <div className="group-container">
                    <h3 className="userMainInfo__heading">
                        User's Information
                    </h3>
                    <p className="userMainInfo__text">
                        <span>Fullname: </span> {fullname}
                    </p>
                    <p className="userMainInfo__text">
                        <span>Date of birth:</span> {dateConverter(dateOfBirth)}
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

                    <p>{phone}</p>
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
