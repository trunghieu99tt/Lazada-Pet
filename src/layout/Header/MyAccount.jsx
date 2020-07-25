import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "../../componentsDash/UserDash/Avatar";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const MyAccount = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.currentUser);
	const [refreshToken, setRefreshToken] = useLocalStorage(
		"refreshToken",
		null
	);
	const [accessToken, setAccessToken] = useLocalStorage("acccessToken", null);

	const handleLogout = () => {
		dispatch({ type: "CLEAR_USER" });
		setRefreshToken(null);
		setAccessToken(null);
	};

	console.log("user", user);

	const isShop = user?.isShop;

	return (
		<section className="header-myAccount">
			{(user && (
				<React.Fragment>
					<Avatar src={user && user.avatar} className="avatar" />
					{
						<ul className="controlList">
							<li className="controlList-item">
								<Link to={(isShop && "/shop-dash") || "/user"}>
									{isShop ? "Shop Manager" : "Account Detail"}
								</Link>
							</li>
							<li
								className="controlList-item"
								onClick={handleLogout}
							>
								Logout
							</li>
						</ul>
					}
				</React.Fragment>
			)) || (
				<Link to="/auth" className="header-nav__link">
					Login
				</Link>
			)}
		</section>
	);
};

export default MyAccount;
