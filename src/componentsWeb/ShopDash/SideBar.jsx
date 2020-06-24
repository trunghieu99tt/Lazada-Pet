import React from "react";
import SideBarItem from "./SideBarItem";

const SideBar = ({ changeLayer, layer }) => {
	const sideBarItems = [
		{
			name: "Tổng quan",
		},
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

	console.log("layer", layer);

	return (
		<nav className="sidebar sidebar-offcanvas" id="sidebar">
			<ul className="nav">
				{sideBarItems &&
					sideBarItems.length > 0 &&
					sideBarItems.map((item, index) => (
						<SideBarItem
							{...item}
							id={index + 1}
							changeLayer={changeLayer}
							isActive={index + 1 === layer}
						/>
					))}
			</ul>
		</nav>
	);
};

export default SideBar;
