import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import BaseView from "./layout/BaseView";
import HomePage from "./pages/HomePage";
import * as actionTypes from "./redux/web/webs.types";
import "./static/css/main.min.css";
// import { getRandomNumber, uploadData } from "./utils/helper";
// import { API_URL } from "./variables";
// import axios from 'axios'

class App extends Component {
	componentDidMount() {
		// this.postData();
	}

	// postData = async () => {
	// 	const data = [...Array(100)].map((_, index) => {
	// 		const rating = getRandomNumber(0, 5);
	// 		const price = getRandomNumber(0, 999);
	// 		const imageURL =
	// 			"https://pawfriends.qodeinteractive.com/wp-content/uploads/2019/07/shop-img-1-269x300.jpg";
	// 		const name = "Product";
	// 		const description =
	// 			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus non atque officia vitae dolore incidunt autem consequatur nulla asperiores voluptatem eaque recusandae tempore eos voluptatum quae a, illum, vel ipsam.";

	// 		return {
	// 			name,
	// 			price,
	// 			rating,
	// 			imageURL,
	// 			id: index,
	// 			description,
	// 		};
	// 	});

	// 	data.forEach(async (item) => await uploadData("products", item));
	// };

	render() {
		return (
			<React.Fragment>
				<Switch>
					<Route exact="/" component={HomePage}></Route>
				</Switch>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	menu: state.web.menu,
	logo: state.web.logo,
	slides: state.web.slides,
	categories: state.web.categories,
	isLoadingHomePage: state.web.isLoadingHomePage,
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetchMenu: () => dispatch({ type: actionTypes.FETCH_MENU_DATA }),
		fetchLogo: () => dispatch({ type: actionTypes.FETCH_LOGO_DATA }),
		fetchCategories: () =>
			dispatch({ type: actionTypes.FETCH_CATEGORIES_DATA }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseView(App));

// postData = async () => {
// 	const data = [...Array(100)].map((_, index) => {
// 		const rating = getRandomNumber(0, 5);
// 		const price = getRandomNumber(0, 999);
// 		const imageURL =
// 			"https://pawfriends.qodeinteractive.com/wp-content/uploads/2019/07/shop-img-1-269x300.jpg";
// 		const name = "Product";
// 		return {
// 			name,
// 			price,
// 			rating,
// 			imageURL,
// 			id: index,
// 		};
// 	});

// 	await uploadData("products", data);
// };
