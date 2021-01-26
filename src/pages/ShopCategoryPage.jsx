import { message, Pagination } from "antd";
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
import CancelIcon from "../static/images/cancel.svg";
import { encodeStr } from "../utils/helper";

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
		const filteredData = this.getFilteredData();

		const { products } = this.state;

		const initialData = products || filteredData;

		let orderedProducts = [];
		let orderValue = "";

		switch (orderCondition) {
			case "price":
				orderedProducts = [...initialData].sort(
					(a, b) => a.price - b.price
				);
				orderValue = "Sort by price: low to high";
				break;
			case "price-desc":
				orderedProducts = [...initialData].sort(
					(a, b) => b.price - a.price
				);
				orderValue = "Sort by price: high to low";
				break;
			default:
				orderedProducts = [...initialData];
		}

		this.setState({
			orderValue,
			products: orderedProducts,
		});
	};

	handleChangeSearch = (event) => {
		this.setState({ searchQuery: event.target.value });
	};

	getFilteredData = () => {
		const {
			match: {
				params: { category },
			},
			allProducts,
		} = this.props;

		return (
			(allProducts &&
				allProducts.length > 0 &&
				allProducts.filter((item) => {
					const encodedCategories = encodeStr(item.productType);
					return encodedCategories === category;
				})) ||
			[]
		);
	};

	handleSearch = (event) => {
		event.preventDefault();
		const { searchQuery } = this.state;
		const filteredData = this.getFilteredData();

		const result = filteredData.filter((product) =>
			product.name.toLowerCase().includes(searchQuery.toLowerCase())
		);

		if (!result || result.length === 0) {
			message.error("No result found!");
		}

		this.setState({ products: result, isSearching: true, currPage: 1 });
	};

	offSearchQuery = () => {
		const filteredData = this.getFilteredData();

		this.setState({
			isSearching: false,
			products: filteredData,
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

		const filteredData = this.getFilteredData();

		const data = products || filteredData || [];

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
											Có {(data && data.length) || 0} kết
											quả tìm kiếm với từ khóa "
											{searchQuery}"
											<span
												style={{
													marginLeft: "2rem",
													cursor: "pointer",
												}}
												onClick={this.offSearchQuery}
											>
												<img
													src={CancelIcon}
													alt="cancel"
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
														imageURL={
															item.productImage
														}
														viewProduct={
															this.viewProduct
														}
													/>
												);
											})}
									</div>
									<div className="pagination-wrapper">
										{currentShowProducts &&
											currentShowProducts.length > 0 &&
											data &&
											data.length > pageSize && (
												<Pagination
													key={currPage}
													defaultCurrent={1}
													total={
														(isSearching &&
															data &&
															data.length) ||
														(filteredData &&
															filteredData.length) ||
														0
													}
													defaultPageSize={pageSize}
													current={currPage}
													onChange={
														this.changePagination
													}
													size="small"
												/>
											)}
									</div>
								</div>
							</div>
						</div>
						<aside className="col-md-3 shop-category-page-filter">
							<SmallSearch
								handleChangeSearch={this.handleChangeSearch}
								handleSearch={this.handleSearch}
								value={searchQuery}
								disabled={isSearching}
								required
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
