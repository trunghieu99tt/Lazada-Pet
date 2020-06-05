import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";

const BaseView = (WrappedComponent, props) => {
	return class extends Component {
		componentDidMount() {
			this.fetchLogoData();
			this.fetchMenuData();
		}

		fetchMenuData = () => {
			const { fetchMenu } = this.props;
			fetchMenu();
		};

		fetchLogoData = async () => {
			const { fetchLogo } = this.props;
			fetchLogo();
		};

		render() {
			const { menu, logo, isLoadingHomePage } = this.props;

			// if (isLoadingHomePage) {
			// 	return <Loader />;
			// }

			return (
				<React.Fragment>
					<Header menu={menu} logo={logo} />
					<WrappedComponent {...this.props}></WrappedComponent>
					<Footer />
				</React.Fragment>
			);
		}
	};
};

export default BaseView;
