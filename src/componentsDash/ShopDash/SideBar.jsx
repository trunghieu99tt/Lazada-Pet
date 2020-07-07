import React from "react";
import SideBarItem from "./SideBarItem";

const SideBar = ({ sideBarID, setSideBarID }) => {
    const sideBarItems = [
        {
            name: "Tổng quan",
            url: "/",
        },
        {
            name: "Sản phẩm",
            url: "/products",
        },
        {
            name: "Đơn hàng",
            url: "/orders",
        },
        {
            name: "Khuyến mại",
            url: "/saleEvents",
        },
        {
            name: "Tài chính",
            url: "/",
        },
        {
            name: "Phân tích",
            icon: "fa-bar-chart-o",
            url: "/",
        },
        {
            name: "Tài khoản",
            url: "/account",
        },
    ];

    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                {sideBarItems &&
                    sideBarItems.length > 0 &&
                    sideBarItems.map((item, index) => (
                        <SideBarItem
                            {...item}
                            id={index + 1}
                            setSideBarID={setSideBarID}
                            isActive={index + 1 === sideBarID}
                            prefix={"shop-dash"}
                        />
                    ))}
            </ul>
        </nav>
    );
};

export default SideBar;
