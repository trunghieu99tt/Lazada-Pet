import { message } from "antd";
import React from "react";
import CustomButton from "../SmallComponents/Buttons/FormButton";
import FormInput from "../SmallComponents/Form/FormInput";
import RadioButton from "../SmallComponents/Form/RadioButton";
import ImageUploader from "react-images-upload";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordConfirm: "",
            name: "",
            address: "",
            mobile: "",
            warehouseAddress: "",
            shopOwner: "",
            bankAccount: "",
            isShop: false,
            pictures: [],
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const {
            name,
            email,
            password,
            passwordConfirm,
            address,
            mobile,
            bankAccount,
        } = this.state;

        if (password !== passwordConfirm) {
            message.error("passwords don't match");
            return;
        }
    };

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    onDrop = (picture) => {
        this.setState({
            pictures: [...this.state.picture, picture],
        });
    };

    render() {
        const { openLogin } = this.props;
        const {
            email,
            password,
            name,
            passwordConfirm,
            mobile,
            isShop,
            address,
            warehouseAddress,
            shopOwner,
            bankAccount,
        } = this.state;

        console.log("this.state", this.state);

        return (
            <div className="login-form">
                <h3 className="component-heading">Register</h3>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name="email"
                        type="email"
                        handleChange={this.handleChange}
                        value={email}
                        label="Email"
                        required
                    />
                    <FormInput
                        name="password"
                        type="password"
                        value={password}
                        handleChange={this.handleChange}
                        label="Password"
                        required
                    />
                    <FormInput
                        name="passwordConfirm"
                        type="password"
                        value={passwordConfirm}
                        handleChange={this.handleChange}
                        label="PasswordConfirm"
                        required
                    />

                    <FormInput
                        name="mobile"
                        type="text"
                        value={mobile}
                        handleChange={this.handleChange}
                        label="Mobile"
                    ></FormInput>

                    <FormInput
                        name="address"
                        type="text"
                        value={address}
                        handleChange={this.handleChange}
                        label="Address"
                    ></FormInput>

                    <FormInput
                        name="name"
                        type="text"
                        value={name}
                        handleChange={this.handleChange}
                        label="Name"
                    ></FormInput>

                    <FormInput
                        name="bankAccount"
                        type="text"
                        value={bankAccount}
                        handleChange={this.handleChange}
                        label="Bank Account Number"
                    ></FormInput>

                    <div className="checkbox" onChange={this.handleChange}>
                        <RadioButton
                            name="isShop"
                            label="Shop"
                            id="shop"
                            value="true"
                        />
                        <RadioButton
                            name="isShop"
                            label="Normal User"
                            id="user"
                            value="false"
                        />
                    </div>

                    {isShop === "true" && (
                        <React.Fragment>
                            <FormInput
                                name="warehouseAddress"
                                type="text"
                                value={warehouseAddress}
                                handleChange={this.handleChange}
                                label="Warehouse Address"
                            ></FormInput>
                            <FormInput
                                name="shopOwner"
                                type="text"
                                value={shopOwner}
                                handleChange={this.handleChange}
                                label="shopOwner"
                            ></FormInput>
                            <ImageUploader
                                withIcon={true}
                                buttonText="Choose images"
                                onChange={this.onDrop}
                                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                maxFileSize={5242880}
                            />
                        </React.Fragment>
                    )}

                    <div className="buttons">
                        <CustomButton type="submit"> Sign in </CustomButton>
                    </div>

                    <p className="form-footer-text">
                        Already had an account ?
                        <span onClick={openLogin}>Login now!</span>
                    </p>
                </form>
            </div>
        );
    }
}

export default Register;
