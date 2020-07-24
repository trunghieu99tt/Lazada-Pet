import React, { useState, useEffect } from "react";
import { tableHeadData } from "./product-tableHead.data";
import DataTable from "../../../CommonComponents/Tables/DataTable/DataTable";
import Axios from "axios";
import { API_URL } from "../../../variables";
import Loader1 from "../../../componentsWeb/SmallComponents/Loader1";

const ProductDash = ({ allProducts, setCurrentPage, setID, ...otherProps }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await Axios.get(`${API_URL}/products.json`);
        const products = response?.data && Object.values(response.data);
        setData(products);
    };

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
                dataSample={data}
                deleteEntry={deleteItem}
                tableHeadData={tableHeadData}
                tableName="Products"
                statusFilter={categoriesFilter}
                badges={badges}
                options={statusOptions}
                searchFields={searchFields}
                prefix="product"
                existDateRange
                pageID={2}
                setCurrentPage={setCurrentPage}
                setID={setID}
            />
        </div>
    );
};

export default ProductDash;
