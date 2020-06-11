import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "../componentsWeb/Banner";
import Categories from "../componentsWeb/Categories/Categories";
import LatestComments from "../componentsWeb/LatestComments/LatestComments";
import LatestNews from "../componentsWeb/LatestNews/LatestNews";
import LatestProducts from "../componentsWeb/LatestProducts/LatestProducts";
import Loader from "../componentsWeb/Loader";
import PopularServices from "../componentsWeb/PopularServices/PopularServices";
import SalesAd from "../componentsWeb/SalesAd/SalesAd";
import * as homepageActionTypes from "../redux/web/homepage/homepage.types";

class HomePage extends Component {
	componentDidMount() {
		const {
			slides,
			categories,
			latestProducts,
			salesAds,
			popularServices,
			latestNews,
			latestComments,
		} = this.props;

		if (!slides || slides.length === 0) {
			this.getDataSlides();
		}

		if (!categories || categories.length === 0) {
			this.getCategoriesData();
		}

		if (!latestProducts || latestProducts.length === 0) {
			this.getLatestProductsData();
		}

		if (!salesAds || salesAds.length === 0) {
			this.getLatestSalesAds();
		}

		if (!popularServices || !popularServices.length) {
			this.getPopularServicesData();
		}

		if (!latestNews || latestNews.length === 0) {
			this.getLatestNewsData();
		}

		if (!latestComments || latestComments.length === 0) {
			this.getLatestCommentData();
		}
	}

	getDataSlides = () => {
		const { fetchSlides } = this.props;
		fetchSlides();
	};

	getCategoriesData = () => {
		const { fetchCategories } = this.props;
		fetchCategories();
	};

	getLatestProductsData = () => {
		const { fetchLatestProducts } = this.props;
		fetchLatestProducts({ limit: 8 });
	};

	getLatestSalesAds = () => {
		const { fetchSalesAds } = this.props;
		fetchSalesAds();
	};

	getPopularServicesData = async () => {
		const { fetchPopularServices } = this.props;

		fetchPopularServices({ limit: 6 });
	};

	getLatestNewsData = () => {
		const { fetchLatestNews } = this.props;
		fetchLatestNews({ limit: 3 });
	};

	getLatestCommentData = () => {
		const { fetchLatestComments } = this.props;
		fetchLatestComments({ limit: 5 });
	};

	render() {
		const {
			slides,
			categories,
			latestProducts,
			salesAds,
			popularServices,
			latestNews,
			latestComments,
		} = this.props;

		if (
			!slides ||
			!categories ||
			!latestProducts ||
			!salesAds ||
			!popularServices ||
			!latestNews ||
			!latestComments
		)
			return <Loader />;

		console.log("latestComments", latestComments);

		return (
			<React.Fragment>
				<Banner slides={slides} />
				<Categories categories={categories} />
				<LatestProducts latestProducts={latestProducts} />
				<SalesAd salesAds={salesAds} />
				<PopularServices popularServices={popularServices} />
				<LatestNews latestNews={latestNews} />
				<LatestComments latestComments={latestComments} />
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	slides: state.homepage.slides,
	categories: state.homepage.categories,
	latestProducts: state.homepage.latestProducts,
	salesAds: state.homepage.salesAds,
	popularServices: state.homepage.popularServices,
	latestNews: state.homepage.latestNews,
	latestComments: state.homepage.latestComments,
});

const mapDispatchToProps = (dispatch) => ({
	fetchSlides: () =>
		dispatch({ type: homepageActionTypes.FETCH_SLIDES_DATA }),
	fetchCategories: () =>
		dispatch({ type: homepageActionTypes.FETCH_CATEGORIES_DATA }),
	fetchLatestProducts: (payload) =>
		dispatch({
			type: homepageActionTypes.FETCH_LATEST_PRODUCTS_DATA,
			payload,
		}),
	fetchSalesAds: () =>
		dispatch({ type: homepageActionTypes.FETCH_SALESADS_DATA }),
	fetchPopularServices: (payload) =>
		dispatch({
			type: homepageActionTypes.FETCH_POPULAR_SERVICES_DATA,
			payload,
		}),
	fetchLatestNews: (payload) =>
		dispatch({ type: homepageActionTypes.FETCH_LATEST_NEWS_DATA, payload }),
	fetchLatestComments: (payload) =>
		dispatch({ type: homepageActionTypes.FETCH_COMMENTS_DATA, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
