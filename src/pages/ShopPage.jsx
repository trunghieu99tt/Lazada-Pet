import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import CategoriesList from "../componentsWeb/ShopPageComponents/CategoriesList";
import ProductsByCategory from "../componentsWeb/ShopPageComponents/ProductsByCategory";
import Loader from "../componentsWeb/SmallComponents/Loader";
import BaseView1 from "../layout/BaseView1";
import * as appTypes from "../redux/web/app/app.types";
import * as homepageActionTypes from "../redux/web/homepage/homepage.types";
import * as shopPageTypes from "../redux/web/shoppage/shoppage.types";
import { parseData2 } from "../utils/helper";

class ShopPage extends Component {
	componentDidMount() {
		const { allProducts, productCategories } = this.props;

		if (!allProducts) {
			this.getProductsData();
		}

		if (!productCategories) {
			this.getProductCategoriesData();
		}
	}

	getProductsData = () => {
		const { fetchProducts } = this.props;
		fetchProducts();
	};

	getProductCategoriesData = () => {
		const { fetchCategories } = this.props;
		fetchCategories();
	};

	render() {
		const { allProducts, productCategories, salesAds } = this.props;

		if (!allProducts || !productCategories || !salesAds) return <Loader />;

		const productCategoriesData = parseData2(productCategories);
		const allProductsData = parseData2(allProducts);

		return (
			<React.Fragment>
				<section className="container-fluid shoppage-main">
					<div className="row">
						<div className="col-md-3">
							<CategoriesList
								categories={productCategoriesData}
								data={allProductsData}
							/>
						</div>
						<div className="col-md-9">
							{productCategoriesData &&
								productCategoriesData.length > 0 &&
								productCategoriesData.map((category) => {
									const filterData =
										allProductsData &&
										allProductsData.length > 0 &&
										allProductsData.filter(
											(item) =>
												item.category === category.name
										);

									return (
										<ProductsByCategory
											categoryName={
												category && category.name
											}
											data={filterData}
										></ProductsByCategory>
									);
								})}
						</div>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	allProducts: state.app.allProducts,
	productCategories: state.shoppage.productCategories,
	salesAds: state.homepage.salesAds,
});

const mapDispatchToProps = (dispatch) => ({
	fetchProducts: () => dispatch({ type: appTypes.FETCH_ALL_PRODUCTS_DATA }),
	fetchCategories: () =>
		dispatch({ type: shopPageTypes.FETCH_PRODUCT_CATEGORIES_DATA }),
	fetchSalesAds: () =>
		dispatch({ type: homepageActionTypes.FETCH_SALESADS_DATA }),
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

const wrapper = compose(connectToStore, BaseView1);

export default wrapper(ShopPage);
