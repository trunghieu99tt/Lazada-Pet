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

class Header1 extends Component {
    state = {
        isSearchOpening: false,
    };

    componentDidMount() {
        const header = document.querySelector(".header");

        this.stickHeaderOnScroll();
        window.addEventListener("scroll", () => {
            this.handleOnScroll(header);
        });
    }

    componentDidUpdate() {
        this.stickHeaderOnScroll();
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
        window.addEventListener("scroll", () => {
            this.handleOnScroll(header);
        });
    };

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
                {isSearchOpening && (
                    <SearchTop closeSearchTop={this.closeSearchBar} />
                )}

                <div className="container">
                    <div className="row align-items-center">
                        <Link to="/" className="header-logo-container">
                            <img
                                src={
                                    (logos && logos.length > 1 && logos[1]) ||
                                    ""
                                }
                                alt="logo"
                                className="header-logo1"
                            />
                        </Link>
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

export default connect(mapStateToProps)(Header1);
