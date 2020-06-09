import React, { Component } from "react";
import Banner from "../componentsWeb/Banner";
import Categories from "../componentsWeb/Categories/Categories";
import LatestProducts from "../componentsWeb/LatestProducts/LatestProducts";

export default class HomePage extends Component {
	render() {
		return (
			<React.Fragment>
				<Banner />
				<Categories />
				<LatestProducts />
			</React.Fragment>
		);
	}
}
