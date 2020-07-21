import React, { Fragment, useState } from "react";
import {
    ShopDashSideBar,
    ShopDashTopNav,
    ShopDashSaleEvent,
    ShopDashProducts,
    ShopDashOverview,
} from "../componentsDash/ShopDash";
import ProductDashDetail from "./Dash/ProductDashDetail";
import OrderWrapper from "../componentsDash/ShopDash/Order/OrderWrapper";
import OrderDetail from "./Dash/OrderDetail/OrderDetail";

const ShopDash = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [id, setID] = useState(null);

    const handleChangePage = (id) => setCurrentPage(id);
    const handleChangeID = (id) => setID(id);

    const childComponent = [
        <ShopDashOverview
            setCurrentPage={handleChangePage}
            setID={handleChangeID}
        />,
        <ShopDashProducts
            setCurrentPage={handleChangePage}
            setID={handleChangeID}
        />,
        <ProductDashDetail setCurrentPage={handleChangePage} />,
        <OrderWrapper setCurrentPage={handleChangePage} />,
        <OrderDetail setCurrentPage={handleChangePage} />,
        <ShopDashSaleEvent
            setCurrentPage={handleChangePage}
            setID={handleChangeID}
        />,
    ][currentPage];

    return (
        <React.Fragment>
            <div className="container-scroller page-body-wrapper">
                <ShopDashTopNav />
                <div className="container-fluid page-body-wrapper">
                    <div className="row row-offcanvas row-offcanvas-right">
                        <ShopDashSideBar
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                        <div
                            style={{
                                flex: "1",
                            }}
                        >
                            {childComponent}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ShopDash;
