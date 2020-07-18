import React from "react";
import { Avatar } from "antd";
import { Link } from "react-router-dom";

const MyAccount = () => {
    const isShop = false;

    return (
        <section className="header-myAccount">
            <Avatar icon="user" className="user-icon" />
            <ul className="controlList">
                <li className="controlList-item">
                    <Link to={(isShop && "/shop-dash") || "/user"}>
                        Account Detail
                    </Link>
                </li>
                <li className="controlList-item">Logout</li>
            </ul>
        </section>
    );
};

export default MyAccount;
