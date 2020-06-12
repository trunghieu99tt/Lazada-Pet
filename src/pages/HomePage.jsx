import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Banner from "../componentsWeb/HomePageComponents/Banner/Banner";
import Categories from "../componentsWeb/HomePageComponents/Categories/Categories";
import LatestComments from "../componentsWeb/HomePageComponents/LatestComments/LatestComments";
import LatestNews from "../componentsWeb/HomePageComponents/LatestNews/LatestNews";
import LatestProducts from "../componentsWeb/HomePageComponents/LatestProducts/LatestProducts";
import PopularServices from "../componentsWeb/HomePageComponents/PopularServices/PopularServices";
import SalesAd from "../componentsWeb/HomePageComponents/SalesAd/SalesAd";
import Loader from "../componentsWeb/SmallComponents/Loader";
import BaseView from "../layout/BaseView";
import * as homepageActionTypes from "../redux/web/homepage/homepage.types";

class HomePage extends Component {
	componentDidMount() {
		const {
			slides,
			categories,
			salesAds,
			popularServices,
			latestComments,
		} = this.props;

		if (!slides || slides.length === 0) {
			this.getDataSlides();
		}

		if (!categories || categories.length === 0) {
			this.getCategoriesData();
		}

		if (!salesAds || salesAds.length === 0) {
			this.getLatestSalesAds();
		}

		if (!popularServices || !popularServices.length) {
			this.getPopularServicesData();
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

	getLatestSalesAds = () => {
		const { fetchSalesAds } = this.props;
		fetchSalesAds();
	};

	getPopularServicesData = async () => {
		const { fetchPopularServices } = this.props;

		fetchPopularServices({ limit: 6 });
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
	salesAds: state.homepage.salesAds,
	popularServices: state.homepage.popularServices,
	latestComments: state.homepage.latestComments,
});

const mapDispatchToProps = (dispatch) => ({
	fetchSlides: () =>
		dispatch({ type: homepageActionTypes.FETCH_SLIDES_DATA }),
	fetchCategories: () =>
		dispatch({ type: homepageActionTypes.FETCH_CATEGORIES_DATA }),
	fetchLatestComments: (payload) =>
		dispatch({ type: homepageActionTypes.FETCH_COMMENTS_DATA, payload }),
	fetchSalesAds: () =>
		dispatch({ type: homepageActionTypes.FETCH_SALESADS_DATA }),
	fetchPopularServices: (payload) =>
		dispatch({
			type: homepageActionTypes.FETCH_POPULAR_SERVICES_DATA,
			payload,
		}),
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

const wrapper = compose(connectToStore, BaseView);

export default wrapper(HomePage);
