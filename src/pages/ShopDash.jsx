import React, { useState } from "react";
import {
	Finance,
	ShopDashOverview,
	ShopDashProducts,
	ShopDashSaleEvent,
	ShopDashSaleEventDetail,
	ShopDashSideBar,
	ShopDashTopNav,
	Statistic,
} from "../componentsDash/ShopDash";
import OrderWrapper from "../componentsDash/ShopDash/Order/OrderWrapper";
import ShopInfo from "../componentsDash/ShopDash/ShopInfo/ShopInfo";
import OrderDetail from "./Dash/OrderDetail/OrderDetail";
import ProductDashDetail from "./Dash/ProductDashDetail";

const ShopDash = () => {
	const [currentPage, setCurrentPage] = useState(0);
	const [id, setID] = useState(null);

	const handleChangePage = (id) => setCurrentPage(id);
	const handleChangeID = (id) => setID(id);

	const childComponent = [
		<ShopDashOverview
			setCurrentPage={handleChangePage}
			setID={handleChangeID}
		/>,
		<ShopDashProducts
			setCurrentPage={handleChangePage}
			setID={handleChangeID}
		/>,
		<ProductDashDetail setCurrentPage={handleChangePage} id={id} />,
		<OrderWrapper
			setCurrentPage={handleChangePage}
			setID={handleChangeID}
		/>,
		<OrderDetail setCurrentPage={handleChangePage} id={id} />,
		<ShopDashSaleEvent
			setCurrentPage={handleChangePage}
			setID={handleChangeID}
		/>,
		<ShopDashSaleEventDetail />,
		<Finance />,
		<Statistic />,
		<ShopInfo />,
	][currentPage];

	return (
		<React.Fragment>
			<div className="container-scroller page-body-wrapper">
				<ShopDashTopNav />
				<div className="container-fluid page-body-wrapper">
					<div className="row row-offcanvas row-offcanvas-right">
						<ShopDashSideBar
							setCurrentPage={setCurrentPage}
							currentPage={currentPage}
						/>
						<div
							style={{
								flex: "1",
							}}
						>
							{childComponent}
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ShopDash;
