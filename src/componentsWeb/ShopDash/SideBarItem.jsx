import React from "react";

const SideBarItem = ({ icon, name, changeLayer, id }) => {
	return (
		<li
			className="nav-item"
			id={`nav-item-${id}`}
			onClick={() => changeLayer(id)}
		>
			<a href="#" className="nav-link">
				<i className={`${icon} menu-icon`}></i>
				<span className="menu-title">{name}</span>
			</a>
		</li>
	);
};

export default SideBarItem;
