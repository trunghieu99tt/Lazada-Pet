import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Modal from "../componentsWeb/HomePageComponents/Modal/Modal";
import CategoriesList from "../componentsWeb/ShopPageComponents/CategoriesList";
import ProductsByCategory from "../componentsWeb/ShopPageComponents/ProductsByCategory";
import Loader from "../componentsWeb/SmallComponents/Loader";
import WrapperWithAds from "../layout/BaseView1";
import * as appTypes from "../redux/web/app/app.types";
import * as homepageActionTypes from "../redux/web/homepage/homepage.types";
import * as shopPageTypes from "../redux/web/shoppage/shoppage.types";
import { parseData2 } from "../utils/helper";

class ShopPage extends Component {
    state = {
        product: null,
    };

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

    toggleShowModal = (open = true) => {
        const modal = document.querySelector(".product-modal-container");
        if (modal) {
            if (open) modal.classList.add("active");
            else modal.classList.remove("active");
        }
    };

    viewProduct = (product) => {
        this.toggleShowModal();
        this.setState({
            product,
        });
    };

    closeModal = () => {
        this.toggleShowModal(false);
        this.setState({
            product: null,
        });
    };

    render() {
        const { allProducts, productCategories, salesAds } = this.props;

        const { product } = this.state;

        if (!allProducts || !productCategories || !salesAds) return <Loader />;
        const productCategoriesData =
            (allProducts?.length > 0 &&
                allProducts.reduce((categories, item) => {
                    const itemCategories = item.categories;
                    return [...new Set([...categories, ...itemCategories])];
                }, [])) ||
            [];

        return (
            <React.Fragment>
                <Modal item={product} closeModal={this.closeModal} />

                <section className="container-fluid shoppage-main">
                    <div className="row">
                        <div className="col-md-3">
                            <CategoriesList
                                categories={productCategoriesData}
                                data={allProducts}
                            />
                        </div>
                        <div className="col-md-9">
                            {productCategoriesData &&
                                productCategoriesData.length > 0 &&
                                productCategoriesData.map((category) => {
                                    const filterData =
                                        allProducts &&
                                        allProducts.length > 0 &&
                                        allProducts.filter((item) =>
                                            item?.categories?.includes(category)
                                        );

                                    return (
                                        <ProductsByCategory
                                            categoryName={category}
                                            data={filterData}
                                            viewProduct={this.viewProduct}
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

const wrapper = compose(connectToStore, WrapperWithAds);

export default wrapper(ShopPage);
