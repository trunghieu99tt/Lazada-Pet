import React from "react";

const SideBarItem = ({ icon, name, changeLayer }) => {
	return (
		<li className="nav-item">
			<a href="#" className="nav-link">
				<i className={`${icon} menu-icon`}></i>
				<span className="menu-title">{name}</span>
			</a>
		</li>
	);
};

export default SideBarItem;
