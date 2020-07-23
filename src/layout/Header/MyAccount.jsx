import React, { useReducer } from "react";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const MyAccount = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const [refreshToken, setRefreshToken] = useLocalStorage(
        "refreshToken",
        null
    );

    const handleLogout = () => {
        dispatch({ type: "CLEAR_USER" });
        setRefreshToken(null);
    };

    const isShop = false;

    return (
        <section className="header-myAccount">
            {(user && (
                <React.Fragment>
                    <Avatar icon="user" className="user-icon" />
                    <ul className="controlList">
                        <li className="controlList-item">
                            <Link to={(isShop && "/shop-dash") || "/user"}>
                                Account Detail
                            </Link>
                        </li>
                        <li className="controlList-item" onClick={handleLogout}>
                            Logout
                        </li>
                    </ul>
                </React.Fragment>
            )) || (
                <Link to="/auth" className="header-nav__link">
                    Login
                </Link>
            )}
        </section>
    );
};

export default MyAccount;
