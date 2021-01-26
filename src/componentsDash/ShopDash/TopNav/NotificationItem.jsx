import React from "react";

const NotificationItem = () => {
	return (
		<React.Fragment>
			<div className="dropdown-divider"></div>
			<a className="dropdown-item preview-item">
				<div className="preview-thumbnail">
					<div className="preview-icon bg-success">
						<i className="icon-info mx-0"></i>
					</div>
				</div>
				<div className="preview-item-content">
					<h6 className="preview-subject font-weight-medium">
						Application Error
					</h6>
					<p className="font-weight-light small-text">Just now</p>
				</div>
			</a>
		</React.Fragment>
	);
};

export default NotificationItem;
