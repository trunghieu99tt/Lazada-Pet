import React from "react";
import OrderDetail from "../componentsWeb/ShopDash/OrderDetail";
// import DataTable from "../CommonComponents/Tables/DataTable";
import SideBar from "../componentsWeb/ShopDash/SideBar";
import TopNav from "../componentsWeb/ShopDash/TopNav/TopNav";

const ShopDash = () => {
	return (
		<React.Fragment>
			<div className="container-scroller page-body-wrapper">
				<TopNav />
				<div className="container-fluid page-body-wrapper">
					<div className="row row-offcanvas row-offcanvas-right">
						<SideBar />
						<div className="content-wrapper">
							{/* <DataTable /> */}
							<OrderDetail />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ShopDash;
