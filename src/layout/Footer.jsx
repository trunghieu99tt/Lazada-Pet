/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { encodeStr, parseData, parseData2 } from "../utils/helper";

export default class Footer extends Component {
    render() {
        const { logo, menu, siteInfo, latestNews, latestProducts } = this.props;

        const logoData = logo && parseData2(logo);
        const menuData = menu && parseData(menu);
        const latestNewsData = parseData2(latestNews);
        const latestProductsData = parseData2(latestProducts);

        // console.log("latestNewsData", latestNewsData);
        // console.log("latestProductsData", latestProductsData);

        return (
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <Link to="/">
                                <figure className="footer-site-logo-container">
                                    <img
                                        src={
                                            (logoData &&
                                                logoData.length > 1 &&
                                                logoData[1]) ||
                                            ""
                                        }
                                        className="footer-site-logo"
                                        alt="logo"
                                    ></img>
                                </figure>
                            </Link>
                            <div className="footer-site-description">
                                {(siteInfo && siteInfo.description) || ""}
                            </div>
                        </div>
                        <div className="col-md-4 footer-item">
                            <div className="footer-item-header">
                                Popular Products
                            </div>

                            <ul className="footer-list">
                                {latestProductsData &&
                                    latestProductsData.length > 0 &&
                                    latestProductsData
                                        .slice(
                                            0,
                                            Math.min(
                                                latestProductsData.length,
                                                4
                                            )
                                        )
                                        .map((item) => {
                                            return (
                                                <li className="footer-list-item">
                                                    <Link
                                                        to={`/product/${item.productID}`}
                                                        className="footer-list-item__link"
                                                    >
                                                        {(item && item.name) ||
                                                            ""}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                            </ul>
                        </div>
                        <div className="col-md-4 footer-item">
                            <div className="footer-item-header">
                                Popular Products
                            </div>

                            <ul className="footer-list">
                                {latestNewsData &&
                                    latestNewsData.length > 0 &&
                                    latestNewsData
                                        .slice(
                                            0,
                                            Math.min(latestNewsData.length, 4)
                                        )
                                        .map((item) => {
                                            return (
                                                <li className="footer-list-item">
                                                    <Link
                                                        to={`/news/${encodeStr(
                                                            (item &&
                                                                item.title) ||
                                                                ""
                                                        )}`}
                                                        className="footer-list-item__link"
                                                    >
                                                        {(item && item.title) ||
                                                            ""}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        Lazada Pet © 2020 All rights reserved by{" "}
                        <a
                            href="lostboyfromneverland.me"
                            target="_blank"
                            className="footer-copyright__link"
                        >
                            {(siteInfo && siteInfo.copyright) || ""}
                        </a>
                    </p>
                </div>
            </footer>
        );
    }
}
