import { message, Modal } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import axios from "../axios";
import CheckoutItem from "../componentsWeb/Checkout/CheckoutItem";
import CheckoutModal from "../componentsWeb/Checkout/CheckoutModal";
import { useLocalStorage } from "../hooks/useLocalStorage";
import WrapperWithAds from "../layout/BaseView1";
import { addItem, clearItemFromCart } from "../redux/web/cart/cart.actions";
import {
	selectCartItems,
	selectCartTotal,
} from "../redux/web/cart/cart.selectors";

const Checkout = ({ cartItems, total }) => {
	const [isOpeningModal, setIsOpeningModal] = useState(false);
	const [cart, setCart] = useLocalStorage("cartItems", []);

	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.currentUser);

	useEffect(() => {
		if (!cartItems || !cartItems.length) {
			addItemsFromLocalStorage();
		}
	}, [cart]);

	const clearCheckout = useCallback(
		(cartItems) => {
			cartItems.forEach((cartItem) =>
				dispatch(clearItemFromCart(cartItem))
			);
			setCart(null);
		},
		[dispatch, setCart]
	);

	const addItemsFromLocalStorage = () => {
		cart &&
			cart.forEach((item) => {
				const { amount } = item;
				dispatch(addItem(item, amount));
			});
	};

	const handleCheckout = () => {
		if (user?.isShop) {
			Modal.error({
				title:
					"Can't checkout when you're using shop account. Please log in with customer account!",
			});
		} else if (cartItems && cartItems.length > 0) {
			Modal.confirm({
				title: "Confirm checkout",
				content: "Check out all items ?",
				okText: "Yes",
				cancelText: "No",
				onOk: onSubmitCheckout,
			});
		} else {
			Modal.error({
				title: "You haven't have any item in your cart yet!",
			});
		}
	};

	const displaySuccessMessage = () =>
		message.success("Checkouted successfully");

	const displayErrorMessage = (err) => message.error(err);

	const openModal = () => {
		setIsOpeningModal(true);
	};

	const closeModal = () => {
		setIsOpeningModal(false);
	};

	const updateData = async () => {
		if (user) {
			try {
				cartItems.forEach((item) => postData(item));
				displaySuccessMessage();
				clearCheckout(cartItems);
			} catch (error) {
				displayErrorMessage(error);
			}
		} else {
			displaySuccessMessage();
			clearCheckout(cartItems);
			closeModal();
		}
	};

	const onSubmitCheckout = () => {
		if (user) {
			updateData();
		} else {
			openModal();
		}
	};

	const postData = async (item) => {
		try {
			const actualData = {
				...item,
				confirmedAt: new Date(),
			};

			const postData = {
				productId: item?.id,
				name: item?.name,
				shopId: item?.shopId,
				customerId: user?.id,
				description: item?.description,
				createdAt: new Date(),
				phone: user?.phone,
				address: user?.address,
				deliveryOn: null,
				amount: item?.amount,
				price: item?.price,
				status: 1,
			};
			const response = await axios.post(`/orders/`, postData);
			console.log("response", response);
		} catch (error) {}
	};

	return (
		<div className="checkout-page">
			{isOpeningModal && (
				<CheckoutModal
					updateData={updateData}
					closeModal={closeModal}
				/>
			)}

			<div className="checkout-header">
				<div className="header-block">
					<span>Product</span>
				</div>
				<div className="header-block">
					<span>Name</span>
				</div>
				<div className="header-block">
					<span>Quantity</span>
				</div>
				<div className="header-block">
					<span>Price</span>
				</div>
				<div className="header-block">
					<span>Remove</span>
				</div>
			</div>

			{(cartItems &&
				cartItems.length &&
				cartItems.map((cartItem) => (
					<CheckoutItem cartItem={cartItem} />
				))) || (
				<h2
					style={{
						margin: "2rem",
					}}
				>
					It seems that you haven't had any product in cart yet!
				</h2>
			)}

			<div className="total">
				TOTAL: <span>{total}$</span>
			</div>

			<button className="button--1" onClick={handleCheckout}>
				Checkout
			</button>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
	total: selectCartTotal,
});

const withRedux = connect(mapStateToProps);

const withLayout = compose(withRedux, WrapperWithAds);

export default withLayout(Checkout);
