import React, { useEffect, useState } from "react";
import { fakeData } from "./products-fake.data";
import { tableHeadData } from "./product-tableHead.data";
import DataTable from "../../../CommonComponents/Tables/DataTable/DataTable";
import ShopDashWrapper from "../../../pages/ShopDash";

const ProductDash = ({ allProducts, ...otherProps }) => {
    const [product, setProduct] = useState(null);
    const [data, setData] = useState([...fakeData]);

    const searchFields = [
        { name: "By Product name", attribute: "name" },
        { name: "By Product ID", attribute: "productID" },
    ];

    const badges = [
        ["Unavailable", "badge-danger"],
        ["Out of stock", "badge-info"],
        ["Available", "badge-success"],
    ];

    const statusOptions = ["All", "Available", "Unavailable", "Out of stock"];

    const viewItem = (product) => setProduct(product);
    const resetItem = () => setProduct(null);

    const handleEditItem = (item) => {
        const filterData = data.filter((e) => e.orderID !== item.orderID);
        const newData = [...filterData, item].sort(
            (a, b) => a.orderID - b.orderID
        );
        setData(newData);
        resetItem();
    };

    const deleteItem = (item) => {
        const newData = data.filter((e) => e.id !== item.id);
        setData(newData);
    };

    const categoriesFilter = (event, dataSample) => {
        const category = event.target.value;
        let finalResult = [...dataSample];
        if (category !== "All") {
            const filterData =
                data?.length &&
                data.filter((e) => e.categories.includes(category));
            finalResult = [...filterData];
        }
        return finalResult;
    };

    return (
        <div className="shopDash-products-wrapper">
            <DataTable
                viewEntry={viewItem}
                dataSample={data}
                deleteEntry={deleteItem}
                tableHeadData={tableHeadData}
                tableName="Products"
                statusFilter={categoriesFilter}
                badges={badges}
                options={statusOptions}
                searchFields={searchFields}
                existDateRange
            />
        </div>
    );
};

export default ShopDashWrapper(ProductDash);
