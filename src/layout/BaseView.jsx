import React, { Component } from "react";
import { connect } from "react-redux";
import * as appActionTypes from "../redux/web/app/app.types";
import * as homepageActionTypes from "../redux/web/homepage/homepage.types";
import Footer from "./Footer";
import Header from "./Header";

const BaseView = (WrappedComponent, props) => {
	class HocComponent extends Component {
		componentDidMount() {
			const {
				menu,
				logo,
				siteInfo,
				latestProducts,
				latestNews,
			} = this.props;

			if (!menu) {
				this.getLogoData();
			}

			if (!logo) {
				this.getMenuData();
			}

			if (!siteInfo) {
				this.getSiteData();
			}

			if (!latestNews || latestNews.length === 0) {
				this.getLatestNewsData();
			}

			if (!latestProducts || latestProducts.length === 0) {
				this.getLatestProductsData();
			}
		}

		getMenuData = () => {
			const { fetchMenu } = this.props;
			fetchMenu();
		};

		getLogoData = () => {
			const { fetchLogo } = this.props;
			fetchLogo();
		};

		getSiteData = () => {
			const { fetchSiteInfo } = this.props;
			fetchSiteInfo();
		};

		getLatestProductsData = (limit = 12) => {
			const { fetchLatestProducts } = this.props;
			fetchLatestProducts({ limit });
		};

		getLatestNewsData = (limit = 4) => {
			const { fetchLatestNews } = this.props;
			fetchLatestNews({ limit });
		};

		render() {
			const {
				menu,
				logo,
				siteInfo,
				latestProducts,
				latestNews,
			} = this.props;

			return (
				<React.Fragment>
					<Header menu={menu} logo={logo} />
					<WrappedComponent {...this.props}></WrappedComponent>
					<Footer
						siteInfo={siteInfo}
						logo={logo}
						menu={menu}
						latestProducts={latestProducts}
						latestNews={latestNews}
					/>
				</React.Fragment>
			);
		}
	}

	const mapStateToProps = (state) => ({
		menu: state.app.menu,
		logo: state.app.logo,
		siteInfo: state.app.siteInfo,
		latestProducts: state.homepage.latestProducts,
		latestNews: state.homepage.latestNews,
	});

	const mapDispatchToProps = (dispatch) => {
		return {
			fetchMenu: () => dispatch({ type: appActionTypes.FETCH_MENU_DATA }),
			fetchLogo: () => dispatch({ type: appActionTypes.FETCH_LOGO_DATA }),
			fetchSiteInfo: () =>
				dispatch({ type: appActionTypes.FETCH_SITE_DATA }),
			fetchLatestProducts: (payload) =>
				dispatch({
					type: homepageActionTypes.FETCH_LATEST_PRODUCTS_DATA,
					payload,
				}),
			fetchLatestNews: (payload) =>
				dispatch({
					type: homepageActionTypes.FETCH_LATEST_NEWS_DATA,
					payload,
				}),
		};
	};

	const connectToStore = connect(mapStateToProps, mapDispatchToProps);

	return connectToStore(HocComponent);
};

export default BaseView;
