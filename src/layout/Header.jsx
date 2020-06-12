import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import CartDropdown from "../componentsWeb/Cart/CartDropdown";
import CartIcon from "../componentsWeb/Cart/CartIcon";
import { selectCartHidden } from "../redux/web/cart/cart.selectors";
import { encodeStr, parseData } from "../utils/helper";

class Header extends Component {
	state = {
		isSearchOpening: false,
	};

	componentDidMount() {
		const { logo } = this.props;
		const logos = (logo && Object.values(logo)) || [];
		const header = document.querySelector(".header");

		window.addEventListener("scroll", () => {
			const logo = document.querySelector(".header-logo");
			if (window.scrollY > 0) {
				if (logo) logo.src = logos && logos.length > 1 && logos[1];
				header.classList.add("header-scroll");
			} else {
				if (logo) logo.src = logos && logos.length > 0 && logos[0];
				header.classList.remove("header-scroll");
			}
		});
	}

	componentDidUpdate() {
		const { logo } = this.props;
		const logos = (logo && Object.values(logo)) || [];
		const header = document.querySelector(".header");

		window.addEventListener("scroll", () => {
			const logo = document.querySelector(".header-logo");
			if (window.scrollY > 0) {
				if (logo) logo.src = logos && logos.length > 1 && logos[1];
				header.classList.add("header-scroll");
			} else {
				if (logo) logo.src = logos && logos.length > 0 && logos[0];
				header.classList.remove("header-scroll");
			}
		});
	}

	openSearchBar = () => {
		this.setState({
			isSearchOpening: true,
		});
	};

	render() {
		const { menu, logo, hidden } = this.props;
		const { isSearchOpening } = this.state;
		const logos = (logo && Object.values(logo)) || [];
		const menuData = parseData(menu);

		const menuDom =
			menuData?.length > 0 &&
			menuData.map((item) => {
				return (
					<li className="header-nav__item">
						<Link
							className="header-nav__link"
							to={`/${encodeStr(item)}`}
						>
							{item}
						</Link>
					</li>
				);
			});

		return (
			<header className="header">
				<div className="container">
					<div className="row align-items-center">
						<div className="header-logo-container">
							<img
								src={
									(logos && logos.length > 0 && logos[0]) ||
									""
								}
								alt="logo"
								className="header-logo"
							/>
						</div>
						<div className="header-main">
							<nav className="header-nav">
								<ul className="header-nav__list">{menuDom}</ul>
							</nav>
							<div className="header-shop">
								<div className="header-search">
									<span className="header-search-inner">
										<span className="header-search__text">
											Search
										</span>
										<img
											src={require("../static/images/search.svg")}
											alt="search"
											className="header-search__image"
										/>
									</span>
								</div>
								<CartIcon />
							</div>
						</div>
						{hidden ? null : <CartDropdown />}
					</div>
				</div>
			</header>
		);
	}
}
const mapStateToProps = createStructuredSelector({
	hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
