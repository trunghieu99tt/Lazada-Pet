import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const ProductDash = ({ allProducts, ...otherProps }) => {
	const [data, setData] = useState(allProducts);

	const getProductsData = () => {
		const { fetchProducts } = otherProps;
		fetchProducts();
	};

	useEffect(() => {
		if (!allProducts) {
			getProductsData();
		}
	});

	return <div></div>;
};

const mapStateToProps = (state) => ({
	allProducts: state.app.allProducts,
});

const mapDispatchToProps = (dispatch) => ({
	fetchProducts: () => dispatch({ type: "FETCH_ALL_PRODUCTS_DATA" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDash);
