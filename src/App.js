import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import BaseView from "./layout/BaseView";
import HomePage from "./pages/HomePage";
import * as appTypes from "./redux/web/app/app.types";
import * as homepageTypes from "./redux/web/homepage/homepage.types";
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
	menu: state.app.menu,
	logo: state.app.logo,
	siteInfo: state.app.siteInfo,
	latestProducts: state.homepage.latestProducts,
	latestNews: state.homepage.latestNews,
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetchMenu: () => dispatch({ type: appTypes.FETCH_MENU_DATA }),
		fetchLogo: () => dispatch({ type: appTypes.FETCH_LOGO_DATA }),
		fetchSiteInfo: () => dispatch({ type: appTypes.FETCH_SITE_DATA }),
		fetchLatestProducts: (payload) =>
			dispatch({
				type: homepageTypes.FETCH_LATEST_PRODUCTS_DATA,
				payload,
			}),
		fetchLatestNews: (payload) =>
			dispatch({
				type: homepageTypes.FETCH_LATEST_NEWS_DATA,
				payload,
			}),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseView(App));
