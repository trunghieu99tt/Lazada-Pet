import React from "react";
import { Avatar } from "antd";
import { Link } from "react-router-dom";

const Sidebar = ({ setCurrentPage }) => {
    return (
        <aside className="group-container sideBar">
            <section className="sideBar-userInfo">
                <Avatar icon="user" className="sideBar-userInfo__icon" />
                <div className="sideBar-userInfo__text">
                    <p>Nguyen Trung Hieu</p>
                    <p> trunghieu99tt</p>
                </div>
            </section>
            <section className="sideBar-item" onClick={() => setCurrentPage(0)}>
                <h2 className="sideBar__heading">Manage My Account</h2>
            </section>
            <section className="sideBar-item" onClick={() => setCurrentPage(2)}>
                <h2 className="sideBar__heading">My Orders</h2>
            </section>
            <section className="sideBar-item">
                <Link to="/checkout">
                    <h2 className="sideBar__heading">My cart</h2>
                </Link>
            </section>
            <section className="sideBar-item" onClick={() => setCurrentPage(4)}>
                <h2 className="sideBar__heading">My Reviews</h2>
            </section>
            <section className="sideBar-item" onClick={() => setCurrentPage(6)}>
                <h2 className="sideBar__heading">My Pets</h2>
            </section>

            <section className="sideBar-item" onClick={() => setCurrentPage(9)}>
                <h2 className="sideBar__heading">Suggestions</h2>
            </section>

            <section
                className="sideBar-item"
                onClick={() => setCurrentPage(10)}
            >
                <h2 className="sideBar__heading">Statistic</h2>
            </section>
        </aside>
    );
};

export default Sidebar;
