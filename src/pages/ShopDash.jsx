import React, { useState } from "react";
import OrderWrapper from "../componentsWeb/ShopDash/Order/OrderWrapper";
import OverviewDash from "../componentsWeb/ShopDash/Overview/OverviewWrapper";
import ProductDash from "../componentsWeb/ShopDash/Products/ProductDash";
import SideBar from "../componentsWeb/ShopDash/SideBar";
import TopNav from "../componentsWeb/ShopDash/TopNav/TopNav";

const ShopDash = () => {
	const [layer, setLayer] = useState(1);

	const changeLayer = (id) => setLayer(id);

	const chooseLayer = () => {
		switch (layer) {
			case 1:
				return <OverviewDash />;
			case 2:
				return <ProductDash />;
			case 3:
				return <OrderWrapper />;
			default:
				return <OverviewDash />;
		}
	};

	return (
		<React.Fragment>
			<div className="container-scroller page-body-wrapper">
				<TopNav />
				<div className="container-fluid page-body-wrapper">
					<div className="row row-offcanvas row-offcanvas-right">
						<SideBar changeLayer={changeLayer} layer={layer} />
						<div className="content-wrapper">{chooseLayer()}</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ShopDash;
