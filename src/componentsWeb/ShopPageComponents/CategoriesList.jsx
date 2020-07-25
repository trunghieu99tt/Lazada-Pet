import React from "react";

const CategoriesList = ({ categories, data }) => {
	return (
		<section className="categories-sidebar">
			<p className="text-1">Categories</p>
			<ul className="categories-list">
				{categories &&
					categories.length > 0 &&
					categories.map((item) => {
						const counter =
							data &&
							data.length > 0 &&
							data.reduce(
								(acc, e) => acc + (e.productType === item),
								0
							);

						return (
							<li className="categories-list-item">
								<a
									href={`/shop#${item}`}
									className="categories-list-item__name"
								>
									{item}
									<span className="categories-list-item__dots"></span>
									<span className="categories-list-item__quantity">
										{counter}
									</span>
								</a>
							</li>
						);
					})}
			</ul>
		</section>
	);
};

export default CategoriesList;
