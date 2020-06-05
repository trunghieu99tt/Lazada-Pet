import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../redux/web/webs.types";
import { parseData } from "../../utils/helper";
import CategoriesCard from "../Cards/CategoriesCard";

class Categories extends Component {
	componentDidMount() {
		const { categories } = this.props;
		if (!categories || categories.length === 0) {
			this.getCategoriesData();
		}
	}

	getCategoriesData = () => {
		const { fetchCategories } = this.props;
		fetchCategories();
	};

	render() {
		const { categories } = this.props;
		const categoriesData = parseData(categories);

		console.log("categoriesData", categoriesData);

		return (
			<section className="home-categories">
				{categoriesData &&
					categoriesData.length > 0 &&
					categoriesData.map((item) => {
						const { image, background, title, description } = item;

						return (
							<CategoriesCard
								image={image}
								background={background}
								title={title}
								description={description}
							/>
						);
					})}
			</section>
		);
	}
}

const mapStateToProps = (state) => ({
	categories: state.web.categories,
});

const mapDispatchToProps = (dispatch) => ({
	fetchCategories: () =>
		dispatch({ type: actionTypes.FETCH_CATEGORIES_DATA }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
