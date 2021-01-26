/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

const SideBarItem = ({
    icon,
    name,
    id,
    url,
    prefix,
    pageID,
    setCurrentPage,
    isActive,
}) => {
    return (
        <li
            className={`nav-item ${isActive ? "nav-item--active" : ""}`}
            id={`nav-item-${id}`}
            onClick={() => setCurrentPage(pageID)}
        >
            <div className="nav-link">
                <i className={`${icon} menu-icon`}></i>
                <span className="menu-title">{name}</span>
            </div>
        </li>
    );
};

export default SideBarItem;
