import { DatePicker } from "antd";
import moment from "moment";
import React, { useState, useEffect } from "react";
import InputDash from "../../../componentsDash/ShopDash/Form/InputDash";
import OptionsDash from "../../../componentsDash/ShopDash/Form/OptionsDash";
import TextAreaDash from "../../../componentsDash/ShopDash/Form/TextAreaDash";
import UploadFileDash from "../../../componentsDash/ShopDash/Form/UploadFileDash";
import { useSessionStorage } from "../../../hooks/useSessionStorage";
import { fakeData } from "../../../componentsDash/ShopDash/Products/products-fake.data";
import Loader1 from "../../../componentsWeb/SmallComponents/Loader1";
import Axios from "axios";
import { API_URL } from "../../../variables";

const ProductDashDetail = ({ item, resetItem, deleteItem, id }) => {
    const [itemInfo, setItemInfo] = useState(item);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await Axios.get(`${API_URL}/products.json`);
        const products = response?.data && Object.values(response.data);
        const filteredItem = products?.find((item) => item.productID === id);
        setItemInfo(filteredItem);
    };

    const options = ["Unavailable", "Out of Stock", "Available"];
    const toggleEdit = () => setIsEdit(!isEdit);

    const onSubmit = async (event) => {
        event.preventDefault();
        await Axios.put(`${API_URL}/products.json`);
    };

    const onFieldChange = (event) => {
        const { name, value } = event.target;

        const newItemInfo = {
            ...itemInfo,
            [name]: value,
        };
        setItemInfo(newItemInfo);
    };

    const onChangeDate = (date, dateString) => {
        const newItemInfo = {
            ...itemInfo,
            purchasedOn: dateString,
        };
        setItemInfo(newItemInfo);
    };

    const onChangeOptions = (event) => {
        const newItemInfo = {
            ...itemInfo,
            status: event.target.value,
        };

        setItemInfo(newItemInfo);
    };

    if (!itemInfo) return <Loader1 />;

    const {
        name,
        price,
        longDescription,
        shortDescription,
        averageRating,
        totalRating,
        status,
        amount,
        imageURL,
    } = itemInfo;

    console.log("itemInfo", itemInfo);

    const dataFields = itemInfo && Object.entries(itemInfo);

    return (
        <div className="itemDetail" onSubmit={onSubmit}>
            <figure>
                <img src={imageURL} alt={name} />
            </figure>

            <InputDash
                type="text"
                name="itemID"
                value={id}
                labelName="Product ID"
                disabled
            />
            <InputDash
                type="text"
                name="name"
                placeHolder="Name"
                labelName="Name"
                value={name}
                disabled={!isEdit}
                onChange={onFieldChange}
            />

            <InputDash
                type="number"
                name="price"
                placeHolder="Price"
                labelName="Price"
                value={Math.round(price)}
                disabled={!isEdit}
                onChange={onFieldChange}
            />

            <InputDash
                type="number"
                name="amount"
                placeHolder="Amount"
                labelName="Amount"
                value={Math.round(amount)}
                disabled={!isEdit}
                onChange={onFieldChange}
            />

            <InputDash
                type="text"
                name="averageRating"
                placeHolder="Average Rating"
                labelName="Average Rating"
                value={averageRating}
                disabled
            />

            <InputDash
                name="status"
                options={options}
                disabled={!isEdit}
                value={status}
                onChange={onChangeOptions}
            />

            <InputDash
                type="text"
                placeHolder="Short Description"
                labelName="Short Description"
                value={shortDescription}
                name="shotDescription"
                disabled={!isEdit}
                onChange={onFieldChange}
            />
            <InputDash
                type="text"
                placeHolder="Description"
                labelName="Description"
                value={longDescription}
                name="longDescription"
                disabled={!isEdit}
                onChange={onFieldChange}
            />

            {(isEdit && (
                <React.Fragment>
                    <button
                        type="submit"
                        className="btn btn-success mr-2"
                        onClick={onSubmit}
                    >
                        Submit
                    </button>
                    <button className="btn btn-light" onClick={toggleEdit}>
                        {" "}
                        Cancel
                    </button>
                </React.Fragment>
            )) || (
                <React.Fragment>
                    <button
                        className="btn btn-success mr-2"
                        onClick={toggleEdit}
                        type="button"
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-light"
                        type="button"
                        onClick={() => {
                            deleteItem(itemInfo);
                            resetItem();
                        }}
                    >
                        Delete
                    </button>
                    <button className="btn btn-light" onClick={resetItem}>
                        Back
                    </button>
                </React.Fragment>
            )}
        </div>
    );
};

export default ProductDashDetail;
