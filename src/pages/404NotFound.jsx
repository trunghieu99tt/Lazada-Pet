import React from "react";
import BaseView from "../layout/BaseView";

const NotFoundPage = () => {
	return (
		<div className="not-found">
			<h3 className="not-found-heading">
				Sorry the page you're looking for isn't available at the moment
			</h3>
		</div>
	);
};

export default BaseView(NotFoundPage);
