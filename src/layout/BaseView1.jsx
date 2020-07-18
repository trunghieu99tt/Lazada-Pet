import React, { Component } from "react";
import { connect } from "react-redux";
import SalesAd from "../componentsWeb/HomePageComponents/SalesAd/SalesAd";
import * as appActionTypes from "../redux/web/app/app.types";
import * as homepageActionTypes from "../redux/web/homepage/homepage.types";
import Footer from "./Footer";
import Header1 from "./Header1";

const WrapperWithAds = (WrappedComponent, props) => {
    class HocComponent extends Component {
        componentDidMount() {
            const {
                menu,
                logo,
                siteInfo,
                latestProducts,
                latestNews,
                salesAds,
            } = this.props;

            this.getLogoData();

            if (!menu) {
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

            if (!salesAds || salesAds.length === 0) {
                this.getLatestSalesAds();
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

        getLatestProductsData = (limit = 8) => {
            const { fetchLatestProducts } = this.props;
            fetchLatestProducts({ limit });
        };

        getLatestNewsData = (limit = 4) => {
            const { fetchLatestNews } = this.props;
            fetchLatestNews({ limit });
        };

        getLatestSalesAds = () => {
            const { fetchSalesAds } = this.props;
            fetchSalesAds();
        };

        render() {
            const {
                menu,
                logo,
                siteInfo,
                latestProducts,
                latestNews,
                salesAds,
            } = this.props;

            return (
                <React.Fragment>
                    <Header1 menu={menu} logo={logo} />
                    <SalesAd salesAds={salesAds} />

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
        salesAds: state.homepage.salesAds,
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
            fetchSalesAds: () =>
                dispatch({ type: homepageActionTypes.FETCH_SALESADS_DATA }),
        };
    };

    const connectToStore = connect(mapStateToProps, mapDispatchToProps);

    return connectToStore(HocComponent);
};

export default WrapperWithAds;
