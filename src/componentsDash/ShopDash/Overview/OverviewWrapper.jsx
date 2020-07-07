import React from "react";
import ShopDashWrapper from "../../../pages/ShopDash";
import OverviewStatistic from "./OverviewStatistic";
import OverviewTopSeller from "./OverviewTopSeller";

const OverviewWrapper = () => {
    return (
        <React.Fragment>
            <OverviewStatistic />
            <OverviewTopSeller />
        </React.Fragment>
    );
};

export default ShopDashWrapper(OverviewWrapper);
