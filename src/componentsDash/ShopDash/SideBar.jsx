import React from "react";
import SideBarItem from "./SideBarItem";

const SideBar = ({ sideBarID, setSideBarID, setCurrentPage, currentPage }) => {
    const sideBarItems = [
        {
            name: "Tổng quan",
            url: "/",
            pageID: 0,
        },
        {
            name: "Sản phẩm",
            url: "/products",
            pageID: 1,
        },
        {
            name: "Đơn hàng",
            url: "/orders",
            pageID: 3,
        },
        {
            name: "Khuyến mại",
            url: "/saleEvents",
            pageID: 5,
        },
        {
            name: "Tài chính",
            url: "/",
            pageID: 7,
        },
        {
            name: "Phân tích",
            icon: "fa-bar-chart-o",
            url: "/",
            pageID: 8,
        },
        {
            name: "Tài khoản",
            url: "/account",
            pageID: 9,
        },
    ];

    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                {sideBarItems &&
                    sideBarItems.length > 0 &&
                    sideBarItems.map((item, index) => (
                        <SideBarItem
                            isActive={item.pageID === currentPage}
                            {...item}
                            id={index + 1}
                            prefix={"shop-dash"}
                            setCurrentPage={setCurrentPage}
                        />
                    ))}
            </ul>
        </nav>
    );
};

export default SideBar;
