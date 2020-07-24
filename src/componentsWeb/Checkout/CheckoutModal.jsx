import React, { useState } from "react";
import FormInput from "../SmallComponents/Form/FormInput";
import { message } from "antd";

const CheckoutModal = ({ closeModal, updateData }) => {
    const [state, setState] = useState({
        name: "",
        address: "",
        phoneNumber: "",
    });

    const validatePhoneNumber = (phone) => {
        console.log("phone", phone);
        var testRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        console.log("testRegex.test(phone)", testRegex.test(phone));
        return testRegex.test(phone);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const { name, address, phoneNumber } = state;

        if (!validatePhoneNumber(phoneNumber)) {
            message.error("Your phone number is invalid");
        } else {
            updateData();
        }
    };

    const { name, address, phoneNumber } = state;

    return (
        <section className="checkoutModal">
            <h2>Let us know where to delivery your items!</h2>

            <form className="checkoutModal-form" onSubmit={onSubmit}>
                <FormInput
                    name="name"
                    type="text"
                    handleChange={handleChange}
                    value={name}
                    label="Name"
                    required
                />
                <FormInput
                    name="address"
                    type="text"
                    handleChange={handleChange}
                    value={address}
                    label="Address"
                    required
                />
                <FormInput
                    name="phoneNumber"
                    type="text"
                    handleChange={handleChange}
                    value={phoneNumber}
                    label="Phone Number"
                    required
                />

                <div className="checkoutModal-buttonGroup">
                    <button className="button--1" onClick={updateData}>
                        Submit
                    </button>
                    <button className="button--1" onClick={closeModal}>
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    );
};

export default CheckoutModal;
