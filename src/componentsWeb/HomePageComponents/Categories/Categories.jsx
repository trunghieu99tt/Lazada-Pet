import React, { Component } from "react";
import { parseData } from "../../../utils/helper";
import CategoriesCard from "../../Cards/Card1";

class Categories extends Component {
	render() {
		const { categories } = this.props;
		const categoriesData = parseData(categories);

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

export default Categories;
