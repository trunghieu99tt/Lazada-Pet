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

const ProductDashDetail = ({
    item,
    resetItem,
    handleEditItem,
    deleteItem,
    id,
}) => {
    const [itemInfo, setItemInfo] = useState(item);
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useSessionStorage("products-dash", fakeData);

    useEffect(() => {
        const item = data?.find((item) => item.id === id);
        setItemInfo(item);
    }, []);

    const options = ["Pending", "Processing", "Completed"];
    const toggleEdit = () => setIsEdit(!isEdit);

    const onSubmit = (event) => {
        event.preventDefault();
        handleEditItem(itemInfo);
    };

    const onFieldChange = (event) => {
        const newItemInfo = {
            ...itemInfo,
            [event.target.name]: event.target.value,
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
        purchasedOn,
        customer,
        shipTo,
        basePrice,
        purchasedPrice,
        status,
    } = itemInfo;

    console.log("itemInfo", itemInfo);

    const dataFields = itemInfo && Object.entries(itemInfo);

    return (
        <div className="itemDetail" onSubmit={onSubmit}>
            {dataFields?.length && dataFields.map((item) => {})}

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

            <div className="form-group">
                <p>Purchased On</p>
                <DatePicker
                    defaultValue={moment(purchasedOn, "DD/MM/YYYY")}
                    format="DD/MM/YYYY"
                    disabled={!isEdit}
                    onChange={onChangeDate}
                />
            </div>

            <InputDash
                type="text"
                name="customer"
                placeHolder="Customer"
                labelName="Customer"
                value={customer}
                disabled={!isEdit}
                onChange={onFieldChange}
            />
            <InputDash
                type="text"
                name="shipTo"
                placeHolder="Ship To"
                labelName="Ship to"
                value={shipTo}
                disabled={!isEdit}
                onChange={onFieldChange}
            />

            <InputDash
                type="text"
                name="basePrice"
                placeHolder="Base Price"
                labelName="Base Price"
                value={basePrice}
                disabled={!isEdit}
                onChange={onFieldChange}
            />
            <InputDash
                type="text"
                name="purchasedPrice"
                placeHolder="Purchased Price"
                labelName="Purchased Price"
                value={purchasedPrice}
                disabled={!isEdit}
                onChange={onFieldChange}
            />

            <UploadFileDash />

            <OptionsDash
                name="status"
                options={options}
                disabled={!isEdit}
                value={status}
                onChange={onChangeOptions}
            />

            <TextAreaDash id="TextArea" name="Note" disabled={!isEdit} />
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
