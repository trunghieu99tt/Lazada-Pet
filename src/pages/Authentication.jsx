import React, { useState } from "react";
import Login from "../componentsWeb/Auth/Login";
import Register from "../componentsWeb/Auth/Register";
import WrapperWithNoAds from "../layout/WrapperWithNoAds";

const Authentication = () => {
	const [isLogin, setIsLogin] = useState(true);

	const toggleLogin = () => {
		setIsLogin(!isLogin);
	};

	return (
		<React.Fragment>
			<div className="container">
				{(isLogin && <Login openRegister={toggleLogin} />) || (
					<Register openLogin={toggleLogin} />
				)}
			</div>
		</React.Fragment>
	);
};

export default WrapperWithNoAds(Authentication);
