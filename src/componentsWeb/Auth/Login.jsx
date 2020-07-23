import React, { useState, useEffect } from "react";
// import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import CustomButton from "../SmallComponents/Buttons/FormButton";
import FormInput from "../SmallComponents/Form/FormInput";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { message } from "antd";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Login = ({ openRegister }) => {
    const [state, setState] = useState({
        username: "",
        password: "",
    });
    const [refreshToken, setRefreshToken] = useLocalStorage(
        "refreshToken",
        null
    );

    const dispatch = useDispatch();
    const history = useHistory();
    const userData = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        if (userData) {
            history.push("/");
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { password, username } = state;
        const url = "http://proptit.social:8080";

        try {
            const tokens = await Axios.post(
                `${url}/auth/jwt/create`,
                {
                    username,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (tokens) {
                const { access, refresh } = tokens && tokens.data;
                setRefreshToken(refresh);
                const user = await Axios.get(`${url}/auth/users/me/`, {
                    headers: {
                        Authorization: `Bearer ${access}`,
                    },
                });

                if (user) {
                    setCurrentUser(user && user.data);
                    history.push("/");
                }
            }
        } catch (error) {}
    };

    const handleChange = (event) => {
        const { value, name } = event.target;
        setState({ ...state, [name]: value });
    };

    const setCurrentUser = (info) => {
        dispatch({ type: "SET_CURRENT_USER", payload: info });
    };

    const { password, username } = state;

    return (
        <div className="login-form">
            <h3 className="component-heading">Login</h3>

            <form onSubmit={handleSubmit}>
                <FormInput
                    name="username"
                    type="text"
                    handleChange={handleChange}
                    value={username}
                    label="Username"
                    required
                />
                <FormInput
                    name="password"
                    type="password"
                    value={password}
                    handleChange={handleChange}
                    label="Password"
                    required
                />
                <div className="buttons">
                    <CustomButton type="submit"> Sign in </CustomButton>
                    {/* <CustomButton isGoogleSignIn onClick={signInWithGoogle}>
                        Sign in with Google
                    </CustomButton> */}
                </div>

                <p className="form-footer-text">
                    Doesn't have an account?{" "}
                    <span onClick={openRegister}>Register here!</span>
                </p>
            </form>
        </div>
    );
};

export default Login;
