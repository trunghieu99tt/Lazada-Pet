import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Login from "../componentsWeb/Auth/Login";
import Register from "../componentsWeb/Auth/Register";
import WrapperWithNoAds from "../layout/WrapperWithNoAds";

const Authentication = () => {
	const [isLogin, setIsLogin] = useState(true);
	const currentUser = useSelector((state) => state.user.currentUser);
	const history = useHistory();

	useEffect(() => {
		if (currentUser) {
			history.push("/");
		}
	}, [currentUser]);

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
