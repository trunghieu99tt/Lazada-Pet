import React, { Component } from "react";
import { Link } from "react-router-dom";
import { encodeStr, parseData } from "../utils/helper";

export default class header extends Component {
	state = {
		isSearchOpening: false,
	};

	componentDidMount() {}

	componentDidUpdate() {
		const header = document.querySelector(".header");

		window.addEventListener("scroll", () => {
			if (window.scrollY > 50) {
				header.classList.add("header-scroll");
			} else {
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
			<header className="header" id="header1">
				<div className="container">
					<div className="row align-items-center">
						<div className="header-logo-container">
							<img
								src={
									(logos && logos.length > 1 && logos[1]) ||
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