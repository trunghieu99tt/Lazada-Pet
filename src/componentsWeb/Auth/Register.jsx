import { message } from "antd";
import React from "react";
import {
    auth,
    createUserProfileDocument,
    signInWithGoogle,
} from "../../firebase/firebase.utils";
import CustomButton from "../SmallComponents/Buttons/FormButton";
import FormInput from "../SmallComponents/Form/FormInput";
import RadioButton from "../SmallComponents/Form/RadioButton";

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
            isShop: false,
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
        } = this.state;

        if (password !== passwordConfirm) {
            message.error("passwords don't match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            const modifiedUser = {
                ...user,
                displayName: name,
                phoneNumber: mobile,
                address,
            };

            await createUserProfileDocument(modifiedUser, { name });

            this.setState(
                {
                    email: "",
                    password: "",
                    passwordConfirm: "",
                    name: "",
                    address: "",
                    mobile: "",
                    isShop: false,
                },
                () => console.log(this.state)
            );
        } catch (error) {
            console.error(error);
        }
    };

    handleChange = (event) => {
        const { value, name } = event.target;
        console.log("name, value", name, value);
        this.setState({ [name]: value });
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
                        </React.Fragment>
                    )}

                    <div className="buttons">
                        <CustomButton type="submit"> Sign in </CustomButton>
                        <CustomButton isGoogleSignIn onClick={signInWithGoogle}>
                            Sign in with Google
                        </CustomButton>
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
