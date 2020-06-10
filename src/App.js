import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import BaseView from "./layout/BaseView";
import HomePage from "./pages/HomePage";
import * as actionTypes from "./redux/web/homepage/homepage.types";
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
			"https://pawfriends.qodeinteractive.com/wp-content/uploads/2019/09/logo-final-2-white.png",
			"https://pawfriends.qodeinteractive.com/wp-content/uploads/2019/09/logo-final-2.png",
		];
		data.forEach(async (item) => await uploadData("logos", item));
	};

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
	menu: state.homepage.menu,
	logo: state.homepage.logo,
	slides: state.homepage.slides,
	categories: state.homepage.categories,
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
