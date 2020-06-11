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
		const data = [...Array(10)].map(() => ({
			title: "Client satisfaction",
			description:
				"lorem ipsum dolor sit amet, consectet lorem ipsum dolor sit amet, consectet lorem ipsum dolor sit amet, consectet lorem ipsum dolor sit amet, consectet lorem ipsum dolor sit amet, consectet lorem ipsum dolor sit amet, consectet lorem ipsum dolor sit amet, consectet",
			author: "John",
		}));
		data.forEach(async (item) => await uploadData("comments", item));
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
