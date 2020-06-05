import React, { Component } from "react";
import { encodeStr, parseData } from "../utils/helper";

export default class Header extends Component {
	state = {
		isSearchOpening: false,
	};

	openSearchBar = () => {
		this.setState({
			isSearchOpening: true,
		});
	};

	render() {
		const { menu, logo } = this.props;
		const { isSearchOpening } = this.state;

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
						<div className="header-logo">
							<img src={logo} alt="" />
						</div>
						<div className="header-main">
							<nav className="header-nav">
								<ul className="header-nav__list">{menuDom}</ul>
							</nav>
							<div className="header-shop">
								<div className="header-search">
									<span>
										<span>Search</span>
										<img
											src={require("../static/images/search.svg")}
											alt="search"
										/>
									</span>
								</div>
								<div className="header-cart">
									<span>
										<span>Cart</span>
										<img
											src={require("../static/images/cart.svg")}
											alt="cart"
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
