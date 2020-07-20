import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import CartDropdown from "../componentsWeb/Cart/CartDropdown";
import CartIcon from "../componentsWeb/Cart/CartIcon";
import { selectCartHidden } from "../redux/web/cart/cart.selectors";
import { encodeStr, parseData } from "../utils/helper";
import SearchTop from "./SearchTop";
import MyAccount from "./Header/MyAccount";
import LogoWhite from "../static/images/logo-white.png";
import Logo from "../static/images/logo.png";

class Header extends Component {
    state = {
        isSearchOpening: false,
    };

    componentDidMount() {
        const { logo } = this.props;
        const logos = (logo && Object.values(logo)) || [];
        const header = document.querySelector(".header");

        window.addEventListener("scroll", () => {
            const logo = document.querySelector(".header-logo1");
            if (window.scrollY > 0) {
                if (logo) logo.src = Logo;
                header.classList.add("header-scroll");
            } else {
                if (logo) logo.src = LogoWhite;
                header.classList.remove("header-scroll");
            }
        });
    }

    componentDidUpdate() {
        const { logo } = this.props;
        const logos = (logo && Object.values(logo)) || [];
        const header = document.querySelector("#header");

        window.addEventListener("scroll", () => {
            const logo = document.querySelector("#header-logo-1");
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

    closeSearchBar = () => {
        this.setState({
            isSearchOpening: false,
        });
    };

    render() {
        const { menu, logo, hidden } = this.props;
        const { isSearchOpening } = this.state;
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
            <header className="header" id="header">
                {isSearchOpening && (
                    <SearchTop closeSearchTop={this.closeSearchBar} />
                )}

                <div className="container">
                    <div className="row align-items-center">
                        <div className="header-logo-container">
                            <Link to="/">
                                <img
                                    src={LogoWhite}
                                    alt="logo"
                                    className="header-logo"
                                    id="header-logo-1"
                                />
                            </Link>
                        </div>
                        <div className="header-main">
                            <nav className="header-nav">
                                <ul className="header-nav__list">{menuDom}</ul>
                            </nav>
                            <div className="header-shop">
                                <div
                                    className="header-search"
                                    onClick={this.openSearchBar}
                                >
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
                                <MyAccount />
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

export default connect(mapStateToProps)(Header);
