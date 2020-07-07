import React, { useState } from "react";
// import OverviewDash from "../componentsDash/ShopDash/Overview/OverviewWrapper";
// import ProductDash from "../componentsDash/ShopDash/Products/ProductDash";
import TopNav from "../componentsDash/ShopDash/TopNav/TopNav";
import SideBar from "../componentsDash/ShopDash/SideBar";
import { Component } from "react";
// import OrderWrapper from "../componentsDash/ShopDash/Order/OrderWrapper";

const ShopDashWrapper = (WrappedComponent) => {
    return class HOC extends Component {
        render() {
            return (
                <React.Fragment>
                    <div className="container-scroller page-body-wrapper">
                        <TopNav />
                        <div className="container-fluid page-body-wrapper">
                            <div className="row row-offcanvas row-offcanvas-right">
                                <SideBar />
                                <div
                                    style={{
                                        flex: "1",
                                    }}
                                >
                                    <WrappedComponent />
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    };
};

export default ShopDashWrapper;
