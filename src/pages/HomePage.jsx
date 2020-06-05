import React, { Component } from "react";
import Banner from "../componentsWeb/Banner";
import Categories from "../componentsWeb/Categories/Categories";

export default class HomePage extends Component {
	render() {
		return (
			<React.Fragment>
				<Banner />
				<Categories />
			</React.Fragment>
		);
	}
}
