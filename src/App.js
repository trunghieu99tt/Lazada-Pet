import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import BlogPage from "./pages/BlogPage";
import Checkout from "./pages/Checkout";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import ShopCategoryPage from "./pages/ShopCategoryPage";
import ShopPage from "./pages/ShopPage";
import "./static/css/main.min.css";
import { uploadData } from "./utils/helper";
// import { API_URL } from "./variables";
// import axios from 'axios'

class App extends Component {
	componentDidMount() {
		// this.postData();
	}

	postData = async () => {
		const data = [
			{
				name: "Toys",
			},
			{
				name: "Dogs",
			},
			{
				name: "Nutrition",
			},
			{
				name: "Clothes",
			},
			{
				name: "Accesories",
			},
			{
				name: "Cats",
			},
		];
		data.forEach(
			async (item) => await uploadData("product-categories", item)
		);
	};

	render() {
		return (
			<React.Fragment>
				<Switch>
					<Route exact path="/" component={HomePage}></Route>
					<Route exact path="/home" component={HomePage}></Route>
					{/* <Route exact path="/" component={BaseView}></Route> */}
					<Route exact path="/shop" component={ShopPage}></Route>
					<Route exact path="/blog" component={BlogPage}></Route>
					<Route exact path="/checkout" component={Checkout}></Route>

					<Route
						path="/product-categories/:category"
						component={ShopCategoryPage}
					></Route>
					<Route
						path="/product/:id"
						component={ProductDetail}
					></Route>
				</Switch>
			</React.Fragment>
		);
	}
}

export default App;
