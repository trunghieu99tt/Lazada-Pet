import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Redirect, Route, Switch } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import NotFoundPage from "./pages/404NotFound";
import Authentication from "./pages/Authentication";
import BlogPage from "./pages/BlogPage";
import Checkout from "./pages/Checkout";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import ShopCategoryPage from "./pages/ShopCategoryPage";
import ShopPage from "./pages/ShopPage";
import User from "./pages/User/User";
import "./static/css/style.css";
import "./static/css/main.min.css";
import SearchResultProduct from "./pages/SearchResultProduct";
import ShopDash from "./pages/ShopDash";
import Axios from "axios";
import { useSelector } from "react-redux/lib/hooks/useSelector";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Provider from "react-redux/lib/components/Provider";
import store from "./redux/store";
import { useDispatch } from "react-redux/lib/hooks/useDispatch";
import Loader from "./componentsWeb/SmallComponents/Loader";
import { API_URL_2 } from "./variables";

const App = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const [refreshToken] = useLocalStorage("refreshToken", null);

    useEffect(() => {
        if (refreshToken) {
            getUserInfo();
        }
    }, []);

    const getUserInfo = async () => {
        try {
            const res = await Axios.post(
                `${API_URL_2}/auth/jwt/refresh`,
                {
                    refresh: refreshToken,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const accessToken = res?.data?.access;
            const user = await Axios.get(`${API_URL_2}/auth/users/me/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (user) {
                setCurrentUser(user && user.data);
            }
        } catch (error) {}
    };

    const setCurrentUser = (info) => {
        dispatch({ type: "SET_CURRENT_USER", payload: info });
    };

    return (
        <React.Fragment>
            <Switch>
                <Route exact path="/" component={HomePage}></Route>
                <Route exact path="/home" component={HomePage}></Route>
                <Route
                    exact
                    path="/auth"
                    render={() =>
                        (currentUser && <Redirect to="/"></Redirect>) || (
                            <Authentication />
                        )
                    }
                    component={Authentication}
                ></Route>
                <Route exact path="/shop" component={ShopPage}></Route>
                <Route exact path="/blog" component={BlogPage}></Route>
                <Route exact path="/checkout" component={Checkout}></Route>
                <Route
                    exact
                    path="/searchProduct/:searchQuery"
                    component={SearchResultProduct}
                ></Route>
                <Route
                    path="/product-categories/:category"
                    component={ShopCategoryPage}
                ></Route>
                <Route path="/product/:id" component={ProductDetail}></Route>
                <Route path="/user" component={User}></Route>
                <Route exact path="/shop-dash" component={ShopDash}></Route>

                <Route component={NotFoundPage} />
            </Switch>
        </React.Fragment>
    );
};

const AppWrapper = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default AppWrapper;

// createMockData = async () => {
//         fakeData.forEach(async (item) => {
//             await uploadData("products", item);
//         });
//     };
