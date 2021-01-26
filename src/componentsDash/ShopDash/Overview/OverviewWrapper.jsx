import React from "react";
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

export default OverviewWrapper;
