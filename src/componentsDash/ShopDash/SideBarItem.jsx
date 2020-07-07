/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useSessionStorage } from "../../hooks/useSessionStorage";

const SideBarItem = ({ icon, name, id, url, prefix }) => {
    const [sideBarID, setSideBarID] = useSessionStorage("sideBarID", 1);

    const changeSideBarID = useCallback(
        (id) => {
            setSideBarID(id);
        },
        [setSideBarID]
    );

    console.log("sideBarID", sideBarID);

    return (
        <li
            className={`nav-item ${id === sideBarID ? "nav-item--active" : ""}`}
            id={`nav-item-${id}`}
            onClick={() => changeSideBarID(id)}
        >
            <Link to={`/${prefix}${url}`} className="nav-link">
                <i className={`${icon} menu-icon`}></i>
                <span className="menu-title">{name}</span>
            </Link>
        </li>
    );
};

export default SideBarItem;
