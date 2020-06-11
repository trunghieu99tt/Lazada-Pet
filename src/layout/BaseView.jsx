import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";

const BaseView = (WrappedComponent, props) => {
	return class extends Component {
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

		getLogoData = async () => {
			const { fetchLogo } = this.props;
			fetchLogo();
		};

		getSiteData = async () => {
			const { fetchSiteInfo } = this.props;

			fetchSiteInfo();
		};

		getLatestProductsData = () => {
			const { fetchLatestProducts } = this.props;
			fetchLatestProducts({ limit: 8 });
		};

		getLatestNewsData = () => {
			const { fetchLatestNews } = this.props;
			fetchLatestNews({ limit: 4 });
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
	};
};

export default BaseView;
