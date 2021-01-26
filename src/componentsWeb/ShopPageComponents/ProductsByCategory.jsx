import React, { Component } from "react";
import { Link } from "react-router-dom";
import { encodeStr } from "../../utils/helper";
import Card2 from "../Cards/Card2";

export default class ProductsByCategory extends Component {
	render() {
		const { categoryName, data, viewProduct } = this.props;

		return (
			<article className="product-by-category" id={`${categoryName}`}>
				<header className="product-by-category-header">
					<Link
						to={`/product-categories/${encodeStr(
							categoryName || ""
						)}`}
					>
						<h3 className="text-1">{categoryName}</h3>
					</Link>
				</header>

				<div className="row product-by-category-content">
					{data &&
						data.length > 0 &&
						data
							.slice(0, Math.min(6, data.length))
							.map((item) => (
								<Card2
									{...item}
									imageURL={item?.productImage}
									viewProduct={viewProduct}
								/>
							))}
				</div>
			</article>
		);
	}
}
