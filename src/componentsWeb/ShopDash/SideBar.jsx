import React from "react";
import SideBarItem from "./SideBarItem";

const SideBar = () => {
	const sideBarItems = [
		{
			name: "Sản phẩm",
		},
		{
			name: "Đơn hàng",
		},
		{
			name: "Khuyến mại",
		},
		{
			name: "Tài chính",
		},
		{
			name: "Phân tích",
			icon: "fa-bar-chart-o",
		},
		{
			name: "Tài khoản",
		},
	];

	return (
		<nav className="sidebar sidebar-offcanvas" id="sidebar">
			<ul className="nav">
				{sideBarItems &&
					sideBarItems.length > 0 &&
					sideBarItems.map((item) => <SideBarItem {...item} />)}
			</ul>
		</nav>
	);
};

export default SideBar;
