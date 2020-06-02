import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "./redux/web/webs.types";

class App extends Component {
	state = {};

	componentDidMount() {
		this.getData();
	}

	getData = async () => {
		const { fetchMenu } = this.props;
		fetchMenu();
	};

	render() {
		const { web } = this.props;

		const menuData = web?.menu && web.menu[Object.keys(web.menu)[0]];

		const menuDom =
			menuData?.length > 0 &&
			menuData.map((item) => {
				return <p>{item}</p>;
			});

		return <React.Fragment>{menuDom}</React.Fragment>;
	}
}

const mapStateToProps = (state) => ({
	web: state.web,
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetchMenu: () => dispatch({ type: actionTypes.FETCH_MENU_DATA }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
