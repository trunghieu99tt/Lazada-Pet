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
// import { API_URL } from "./variables";
// import axios from 'axios'

class App extends Component {
	componentDidMount() {}

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
