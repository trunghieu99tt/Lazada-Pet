import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Provider from "react-redux/lib/components/Provider";
import { useDispatch } from "react-redux/lib/hooks/useDispatch";
import { useSelector } from "react-redux/lib/hooks/useSelector";
import { Redirect, Route, Switch } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import axios from "./axios";
import { useLocalStorage } from "./hooks/useLocalStorage";
import NotFoundPage from "./pages/404NotFound";
import Authentication from "./pages/Authentication";
import BlogPage from "./pages/BlogPage";
import Checkout from "./pages/Checkout";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import SearchResultProduct from "./pages/SearchResultProduct";
import ShopCategoryPage from "./pages/ShopCategoryPage";
import ShopDash from "./pages/ShopDash";
import ShopPage from "./pages/ShopPage";
import User from "./pages/User/User";
import store from "./redux/store";
import "./static/css/style.css";
import "./static/css/main.min.css";

const App = () => {
	const currentUser = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();
	const [refreshToken] = useLocalStorage("refreshToken", null);
	const [_, setAccessToken] = useLocalStorage("accessToken", null);

	useEffect(() => {
		if (refreshToken) {
			getUserInfo();
		}
	}, []);

	const getUserInfo = async () => {
		try {
			const res = await axios.post(`/auth/jwt/refresh`, {
				refresh: refreshToken,
			});
			const access = res?.data?.access;

			if (access) {
				setAccessToken(access);

				const response = await axios.get(`/auth/users/me/`, {
					headers: {
						Authorization: `Bearer ${access}`,
					},
				});

				if (response) {
					const data = response?.data || {};


					let currentUser = {};
					if (data.isShop) {
						const shopResponse = await axios.get("/shops");
						const shopsData = shopResponse?.data;
						currentUser = shopsData.find(
							(item) => item.username === data.username
						);
					} else {
						const userResponse = await axios.get("/customers");
						const usersData = userResponse?.data;
						currentUser = usersData.find(
							(item) => item.username === data.username
						);
					}

					const final = {
						...currentUser,
						isShop: data.isShop,
					};

					setCurrentUser(final);
				}
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
