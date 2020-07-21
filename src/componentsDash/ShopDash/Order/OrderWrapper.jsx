import React, { useState, useEffect } from "react";
import DataTable from "../../../CommonComponents/Tables/DataTable/DataTable";
import faker from "faker";
import { useSessionStorage } from "../../../hooks/useSessionStorage";

const randomDate = (start, end) => {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
};

const OrderWrapper = () => {
    // State
    const [data, setData] = useSessionStorage("orderData", []);

    const tableHeadData = [
        { width: "117px", name: "Item ID", att: "orderID", sortable: true },
        { width: "117px", name: "Name", att: "name", sortable: true },
        { width: "117px", name: "Type", att: "type", sortable: false },
        {
            width: "190px",
            name: "Purchased On",
            att: "purchasedOn",
            sortable: true,
            isDate: true,
        },
        { width: "139px", name: "Customer", att: "customer", sortable: true },
        { width: "111px", name: "Ship to", att: "shipTo", sortable: false },
        {
            width: "152px",
            name: "Base Price",
            att: "basePrice",
            sortable: true,
        },
        {
            width: "213px",
            name: "Purchased Price",
            att: "purchasedPrice",
            sortable: true,
        },
        { width: "115px", name: "Status", att: "status", sortable: false },
        { width: "122px", name: "Actions", sortable: false },
    ];

    const badges = [
        ["Pending", "badge-danger"],
        ["Processing", "badge-info"],
        ["Completed", "badge-success"],
    ];

    const statusOptions = ["All", ...badges.map((e) => e[0])];
    const searchFields = [
        { name: "By Product name", attribute: "name" },
        { name: "By Customer name", attribute: "customer" },
        { name: "By Ship To Place name", attribute: "shipTo" },
    ];

    // Functions

    const handleEditItem = (item) => {
        const filterData = data.filter((e) => e.orderID !== item.orderID);
        const newData = [...filterData, item].sort(
            (a, b) => a.orderID - b.orderID
        );
        setData(newData);
    };

    const deleteItem = (item) => {
        const newData = data.filter((e) => e.id !== item.id);
        setData(newData);
    };

    const statusFilter = (event, dataSample) => {
        const status = event.target.value;
        let finalResult = [...dataSample];
        if (status !== "All") {
            const filterData =
                data?.length &&
                data.filter(
                    (e) => e.status.toLowerCase() === status.toLowerCase()
                );
            finalResult = [...filterData];
        }
        return finalResult;
    };

    return (
        <section className="shopDash-order-wrapper">
            <DataTable
                dataSample={data}
                deleteEntry={deleteItem}
                tableHeadData={tableHeadData}
                tableName="Item"
                statusFilter={statusFilter}
                badges={badges}
                options={statusOptions}
                searchFields={searchFields}
                existDateRange
            />
        </section>
    );
};

export default OrderWrapper;

// [...Array(100)].map((_, idx) => {
//     const d = randomDate(new Date(2019, 0, 1), new Date(2022, 0, 1));
//     const convertedDate = `${d.getDate()}/${
//         d.getMonth() + 1
//     }/${d.getFullYear()}`;

//     return {
//         orderID: idx + 1,
//         name: faker.commerce.productName(),
//         type: faker.commerce.product(),
//         purchasedOn: convertedDate,
//         customer: faker.name.findName(),
//         shipTo: faker.address.country(),
//         basePrice: faker.commerce.price(),
//         purchasedPrice: faker.commerce.price(),
//         status: ["Processing", "Completed", "Pending"][
//             Math.floor(Math.random() * 3)
//         ],
//     };
// });
