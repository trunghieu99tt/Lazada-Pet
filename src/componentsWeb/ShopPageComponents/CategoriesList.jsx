import React from "react";
import { Link } from "react-router-dom";
import { encodeStr, parseData2 } from "../../utils/helper";

const CategoriesList = ({ categories, data }) => {
	const categoriesData = parseData2(categories);

	console.log("data", data);

	return (
		<section className="categories-sidebar">
			<p className="text-1">Categories</p>
			<ul className="categories-list">
				{categoriesData &&
					categoriesData.length > 0 &&
					categoriesData.map((item) => {
						const counter =
							data &&
							data.length > 0 &&
							data.reduce(
								(acc, e) => acc + (e.category === item.name),
								0
							);

						console.log("counter", counter);

						return (
							<li className="categories-list-item">
								<a
									href={`/shop#${item && item.name}`}
									className="categories-list-item__name"
								>
									{(item && item.name) || ""}

									<span className="categories-list-item__dots"></span>

									<span className="categories-list-item__quantity">
										{counter}
									</span>
								</a>
							</li>
						);
					})}
				<li>
					<Link to={`/product-categories/${encodeStr()}`}></Link>
				</li>
			</ul>
		</section>
	);
};

export default CategoriesList;
