/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const SideBarItem = ({ icon, name, changeLayer, id, isActive }) => {
	// const activeSideBarItem = (id) => {
	// 	const SideBarItems = document.querySelectorAll(".nav-item--left");
	// 	SideBarItems.forEach((e) => {
	// 		const eId = e.getAttribute("navid");
	// 		if (~~eId === ~~id) {
	// 			e.classList.add("nav-item--active");
	// 		} else {
	// 			e.classList.remove("nav-item--active");
	// 		}
	// 	});
	// };

	return (
		<li
			className={`nav-item ${isActive ? "nav-item--active" : ""}`}
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
