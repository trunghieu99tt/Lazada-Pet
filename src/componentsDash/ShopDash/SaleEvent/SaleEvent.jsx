import React from "react";
import { useState } from "react";
import { fakeData } from "./saleEvents.data";

const SaleEvent = () => {
    const [data, setData] = useState([...fakeData]);

    const searchFields = [
        { name: "By Sale Event name", attribute: "name" },
        { name: "By Sale Event ID", attribute: "SaleID" },
    ];

    const badges = [
        ["Ended", "badge-danger"],
        ["Pending", "badge-info"],
        ["Running", "badge-success"],
    ];

    const statusOptions = ["All", "Ended", "Pending", "Running"];

    return <section className="shopDash-saleEvents-wrapper"></section>;
};

export default SaleEvent;
