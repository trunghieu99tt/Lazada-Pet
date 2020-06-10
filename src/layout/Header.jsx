import React, { Component } from "react";
import { encodeStr, parseData } from "../utils/helper";

export default class Header extends Component {
	state = {
		isSearchOpening: false,
	};

	componentDidMount() {}

	componentDidUpdate() {
		const { logo } = this.props;
		const logos = (logo && Object.values(logo)) || [];
		const header = document.querySelector(".header");

		window.addEventListener("scroll", () => {
			const logo = document.querySelector(".header-logo");
			if (window.scrollY > 0) {
				logo.src = logos && logos.length > 1 && logos[1];
				header.classList.add("header-scroll");
			} else {
				logo.src = logos && logos.length > 0 && logos[0];
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
		const { menu, logo } = this.props;
		const { isSearchOpening } = this.state;
		const logos = (logo && Object.values(logo)) || [];
		const menuData = parseData(menu);

		const menuDom =
			menuData?.length > 0 &&
			menuData.map((item) => {
				return (
					<li className="header-nav__item">
						<a className="header-nav__link" href={encodeStr(item)}>
							{item}
						</a>
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
								<div className="header-cart">
									<span className="header-cart-inner">
										<span className="header-cart__text">
											Cart
										</span>
										<img
											src={require("../static/images/cart.svg")}
											alt="cart"
											className="header-cart__image"
										/>
									</span>
									<span>0</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		);
	}
}
