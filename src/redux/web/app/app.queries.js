import axios from "axios";
import { API_URL, API_URL_2 } from "../../../variables";

export async function queryMenu() {
	const menuData = await axios({
		method: "GET",
		url: `${API_URL}/menu.json`,
	});

	return menuData;
}

export async function queryLogo() {
	const logoData = await axios({
		method: "GET",
		url: `${API_URL}/logo.json`,
	});

	return logoData;
}

export async function querySiteInfo() {
	const siteData = await axios({
		method: "GET",
		url: `${API_URL}/datasite.json`,
	});

	return siteData;
}

export async function queryAllProducts() {
	const allProducts = await axios({
		method: "GET",
		// url: `${API_URL}/products.json`,
		url: `${API_URL_2}/products`,
	});

	return allProducts;
}
export async function queryAllBlogPosts() {
	const allBlogPosts = await axios({
		method: "GET",
		url: `${API_URL}/news.json`,
	});

	return allBlogPosts;
}
