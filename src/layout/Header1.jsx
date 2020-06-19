import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import CartDropdown from "../componentsWeb/Cart/CartDropdown";
import CartIcon from "../componentsWeb/Cart/CartIcon";
import { selectCartHidden } from "../redux/web/cart/cart.selectors";
import { encodeStr, parseData } from "../utils/helper";

class Header1 extends Component {
	state = {
		isSearchOpening: false,
	};

	componentDidMount() {
		this.stickHeaderOnScroll();
	}

	componentDidUpdate() {
		this.stickHeaderOnScroll();
	}

	componentWillUnmount() {
		const header = document.querySelector(".header");

		window.removeEventListener(
			"scroll",
			() => this.handleOnScroll(header),
			false
		);
	}

	handleOnScroll = (el) => {
		if (window.scrollY > 50) {
			el.classList.add("header-scroll");
		} else {
			el.classList.remove("header-scroll");
		}
	};

	stickHeaderOnScroll = () => {
		const header = document.querySelector(".header");
		window.addEventListener("scroll", () => this.handleOnScroll(header));
	};

	openSearchBar = () => {
		this.setState({
			isSearchOpening: true,
		});
	};

	render() {
		const { menu, logo, hidden } = this.props;

		console.log("logo", logo);

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
								className="header-logo1"
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
								{hidden ? null : <CartDropdown />}
							</div>
						</div>
					</div>
				</div>
			</header>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header1);
