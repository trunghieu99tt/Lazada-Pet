import { faBell, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const TopNav = () => {
	const navItems = [
		<FontAwesomeIcon icon={faBell} />,
		<FontAwesomeIcon icon={faEnvelope} />,
	].map((e) => {
		return (
			<li className="nav-item dropdown">
				<p
					className="nav-link count-indicator dropdown-toggle"
					id="notificationDropdown"
				>
					{e}
					<span className="count"></span>
				</p>
			</li>
		);
	});

	return (
		<nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
			<div className="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
				<Link to="/" className="navbar-brand brand-logo">
					<img
						src={require("../../../static/images/logo.png")}
						alt="Logo"
					></img>
				</Link>
			</div>
			<div className="navbar-menu-wrapper d-flex align-items-center">
				<ul className="navbar-nav navbar-nav-right">{navItems}</ul>
			</div>
		</nav>
	);
};

export default TopNav;
