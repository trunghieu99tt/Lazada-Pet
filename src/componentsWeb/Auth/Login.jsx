import React from "react";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import CustomButton from "../SmallComponents/Buttons/FormButton";
import FormInput from "../SmallComponents/Form/FormInput";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: "", password: "" });
        } catch (error) {
            console.log(error);
        }
    };

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const { openRegister } = this.props;
        const { password, email } = this.state;

        return (
            <div className="login-form">
                <h3 className="component-heading">Login</h3>

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
                    <div className="buttons">
                        <CustomButton type="submit"> Sign in </CustomButton>
                        <CustomButton isGoogleSignIn onClick={signInWithGoogle}>
                            Sign in with Google
                        </CustomButton>
                    </div>

                    <p className="form-footer-text">
                        Doesn't have an account?{" "}
                        <span onClick={openRegister}>Register here!</span>
                    </p>
                </form>
            </div>
        );
    }
}

export default Login;
