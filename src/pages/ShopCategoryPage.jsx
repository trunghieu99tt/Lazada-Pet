import { Pagination } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Card2 from "../componentsWeb/Cards/Card2";
import Modal from "../componentsWeb/HomePageComponents/Modal/Modal";
import Loader from "../componentsWeb/SmallComponents/Loader";
import SelectBox from "../componentsWeb/SmallComponents/SelectBox";
import SmallSearch from "../componentsWeb/SmallComponents/SmallSearch";
import WrapperWithAds from "../layout/BaseView1";
import * as appTypes from "../redux/web/app/app.types";

class ShopCategoryPage extends Component {
	state = {
		products: null,
		pageSize: 13,
		currPage: 1,
		orderValue: null,
		searchQuery: "",
		isSearching: false,
		filteredData: null,
		singleProduct: null,
	};

	componentDidMount() {
		const { allProducts } = this.props;

		if (!allProducts) {
			this.getProductsData();
		}
	}

	getProductsData = () => {
		const { fetchProducts } = this.props;
		fetchProducts();
	};

	orderBy = (orderCondition) => {
		const { allProducts } = this.props;

		let orderedProducts = [];
		let orderValue = "";

		switch (orderCondition) {
			case "rating":
				orderedProducts = [...allProducts].sort(
					(a, b) => b.rating - a.rating
				);
				orderValue = "Sort by average rating: high to low";
				break;
			case "price":
				orderedProducts = [...allProducts].sort(
					(a, b) => a.price - b.price
				);
				orderValue = "Sort by price: low to high";
				break;
			case "price-desc":
				orderedProducts = [...allProducts].sort(
					(a, b) => b.price - a.price
				);
				orderValue = "Sort by price: high to low";
				break;
			default:
				orderedProducts = [...allProducts];
		}

		this.setState({
			orderValue,
			products: orderedProducts,
		});
	};

	handleChangeSearch = (event) => {
		this.setState({ searchQuery: event.target.value });
	};

	getFilterData = () => {
		const {
			match: {
				params: { category },
			},
			allProducts,
		} = this.props;

		return (
			(allProducts &&
				allProducts.length > 0 &&
				allProducts.filter(
					(item) =>
						item.category.toLowerCase() === category.toLowerCase()
				)) ||
			[]
		);
	};

	handleSearch = (event) => {
		event.preventDefault();
		const { searchQuery, products } = this.state;

		const filterData = this.getFilterData();

		const data = products || filterData || [];

		const result =
			(searchQuery &&
				data.filter((product) =>
					product.name
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
				)) ||
			filterData;

		this.setState({ products: result, isSearching: true });
	};

	offSearchQuery = () => {
		const filterData = this.getFilterData();

		this.setState({
			isSearching: false,
			products: filterData,
			searchQuery: "",
		});
	};

	changePagination = (current) => {
		this.setState({ currPage: current }, () => {
			window.scrollTo({ top: 500, behavior: "smooth" });
		});
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
			singleProduct: product,
		});
	};

	closeModal = () => {
		this.toggleShowModal(false);
		this.setState({
			product: null,
		});
	};

	render() {
		const {
			match: {
				params: { category },
			},
			allProducts,
		} = this.props;

		const {
			products,
			pageSize,
			currPage,
			orderValue,
			searchQuery,
			isSearching,
			singleProduct,
		} = this.state;

		const filterData =
			allProducts &&
			allProducts.length > 0 &&
			allProducts.filter(
				(item) => item.category.toLowerCase() === category.toLowerCase()
			);

		const data = products || filterData || [];

		const currentShowProducts =
			data &&
			data.length > 0 &&
			data.slice(
				(currPage - 1) * pageSize,
				Math.min(currPage * pageSize - 1, data.length)
			);

		if (!allProducts) return <Loader />;

		return (
			<React.Fragment>
				<Modal item={singleProduct} closeModal={this.closeModal} />

				<section className="shop-category-page-content">
					<div className="row">
						<div className="col-md-9 shop-category-page-products-container">
							<header className="shop-category-page-header">
								<h3 className="component-heading">
									{category}
								</h3>
							</header>

							<div className="shop-category-page-products">
								<div className="container-fluid">
									{isSearching && (
										<p
											style={{
												fontSize: "15px",
												textAlign: "center",
												margin: "2rem 0",
											}}
										>
											Có{" "}
											{(currentShowProducts &&
												currentShowProducts.length) ||
												0}{" "}
											kết quả tìm kiếm với từ khóa "
											{searchQuery}"
											<span
												style={{
													marginLeft: "2rem",
													cursor: "pointer",
												}}
												onClick={this.offSearchQuery}
											>
												<img
													src="data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMyIgaGVpZ2h0PSIyNyIgdmlld0JveD0iMCAwIDMxIDM0Ij48cGF0aCBkPSJNMjguNiA0LjFjMS0wLjUgMS0wLjUtMC41LTIgLTEtMS41LTEtMS41LTEuNS0wLjUgLTAuNSAwLjUtMSAxLjUtMS41IDEuNSAtMC41IDAuNS0wLjUgMS0wLjUgMS41IDAgMC0xLjUgMS41LTMuMSAzIC0xLjUgMS41LTMuNiAzLTQuNiA0IC0xIDEtMi4xIDItMi4xIDIgLTAuNSAwLTIuNi0yLjUtNC42LTQuOUM4LjEgNi4xIDUuNSAzLjYgNSAzLjYgNCAyLjYgMyAzLjEgMy41IDQuMWMwLjUgMC41IDAgMSAwIDAuNSAtMC41IDAtMSAwLTEuNSAwLjUgLTEgMS0xIDEgMCAxLjUgMS41IDEgNi43IDUuNCA4LjcgNy45bDEuNSAxLjUgLTIuMSAyLjVjLTEgMS0yLjYgMy0zLjYgNC40IC0yLjYgMi41LTYuNyA4LjQtNi4yIDguOSAwIDAgMC41IDAuNSAxLjUgMC41IDEuNSAxIDEuNSAxIDIuMS0wLjUgMC41LTEgMy4xLTQgNS42LTYuNGw1LjEtNC45IDIuNiAyLjVjMS41IDEuNSAzLjYgNCA1LjEgNS40bDMuMSAyLjUgMC41LTFjMS0xLjUgMS0yIDAtMyAtMC41LTAuNS0xLjUtMi0yLjYtMyAtMi4xLTMtNS4xLTYuOS01LjYtNi45IDAtMC41IDEuNS0zIDUuNi03LjlDMjQuNSA3LjYgMjcuMSA1LjEgMjguNiA0LjF6TTE5LjkgMjAuOWMxIDEuNSAyLjEgMyAyLjYgMy41IDAuNSAwLjUgMC41IDEuNSAwLjUgMnYwLjVjMC0wLjUtMS41LTItMy4xLTMuNSAtMy42LTMuNS0zLjYtMy41LTMuMS00LjRDMTcuNCAxOC40IDE3LjkgMTguOSAxOS45IDIwLjl6TTE3LjkgMTQuNWMtMSAxLTEuNSAyLTEuNSAyLjVzLTMuMSAzLjUtNi43IDYuOWMtMy42IDMuNS02LjIgNi40LTYuMiA2LjkgMCAwLTAuNSAwLjUtMSAwLjUgLTEgMC0xLTAuNSAxLjUtMy41IDIuMS0zLjUgNi4yLTguNCA4LjItOS45bDIuMS0xLjUgLTEuNS0yTDcuMSA5QzUgNy4xIDQgNS4xIDQgNS4xYzAuNSAwIDIuMSAxIDMuNiAzIDEuNSAyIDQuMSA0LjQgNS4xIDUuNGwyLjEgMi41IDMuNi00LjRjMi4xLTIgNC4xLTMuNSA0LjEtMy41QzIzIDguMSAxOS45IDEyIDE3LjkgMTQuNXoiLz48L3N2Zz4="
													alt=""
												/>
											</span>
										</p>
									)}
									<div className="row">
										{currentShowProducts &&
											currentShowProducts.length > 0 &&
											currentShowProducts.map((item) => {
												return (
													<Card2
														{...item}
														viewProduct={
															this.viewProduct
														}
													/>
												);
											})}
									</div>
									{currentShowProducts &&
										currentShowProducts.length > 0 && (
											<Pagination
												key={currPage}
												defaultCurrent={1}
												total={
													(isSearching &&
														currentShowProducts &&
														currentShowProducts.length) ||
													(filterData &&
														filterData.length) ||
													0
												}
												defaultPageSize={pageSize}
												current={currPage}
												onChange={this.changePagination}
												size="small"
											/>
										)}
								</div>
							</div>
						</div>
						<aside className="col-md-3 shop-category-page-filter">
							<SmallSearch
								handleChangeSearch={this.handleChangeSearch}
								handleSearch={this.handleSearch}
								value={searchQuery}
							/>

							<SelectBox
								value={orderValue}
								orderBy={this.orderBy}
							/>
						</aside>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	allProducts: state.app.allProducts,
});

const mapDispatchToProps = (dispatch) => ({
	fetchProducts: () => dispatch({ type: appTypes.FETCH_ALL_PRODUCTS_DATA }),
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

const wrapper = compose(connectToStore, WrapperWithAds);

export default wrapper(ShopCategoryPage);
