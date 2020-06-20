import React from "react";
import SideBarItem from "./SideBarItem";

const SideBar = ({ changeLayer }) => {
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
					sideBarItems.map((item, index) => (
						<SideBarItem
							{...item}
							id={index}
							changeLayer={changeLayer}
						/>
					))}
			</ul>
		</nav>
	);
};

export default SideBar;
