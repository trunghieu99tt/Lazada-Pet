import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import NotFoundPage from "./pages/404NotFound";
import Authentication from "./pages/Authentication";
import BlogPage from "./pages/BlogPage";
import Checkout from "./pages/Checkout";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import ShopCategoryPage from "./pages/ShopCategoryPage";
import ShopPage from "./pages/ShopPage";
import { setCurrentUser } from "./redux/web/user/user.actions";
import { selectCurrentUser } from "./redux/web/user/user.selector";
import "./static/css/main.min.css";

// import { uploadData } from "./utils/helper";
// import { API_URL } from "./variables";
// import axios from 'axios'

class App extends Component {
	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;

		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot((snapShot) => {
					setCurrentUser({
						currentUser: {
							id: snapShot.id,
							...snapShot.data(),
						},
					});
				});
			} else {
				setCurrentUser(userAuth);
			}
		});
	}

	render() {
		const { currentUser } = this.props;

		return (
			<React.Fragment>
				<Switch>
					<Route exact path="/" component={HomePage}></Route>
					<Route exact path="/home" component={HomePage}></Route>
					<Route
						exact
						path="/auth"
						render={() =>
							(currentUser && <Redirect to="/"></Redirect>) || (
								<Authentication />
							)
						}
						component={Authentication}
					></Route>
					<Route exact path="/shop" component={ShopPage}></Route>
					<Route exact path="/blog" component={BlogPage}></Route>
					<Route exact path="/checkout" component={Checkout}></Route>
					<Route
						path="/product-categories/:category"
						component={ShopCategoryPage}
					></Route>
					<Route
						path="/product/:id"
						component={ProductDetail}
					></Route>
					<Route component={NotFoundPage} />
				</Switch>
			</React.Fragment>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
