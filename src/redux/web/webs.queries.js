import axios from "axios";
import { API_URL } from "../../variables";

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

export async function querySlides() {
	const slides = await axios({
		method: "GET",
		url: `${API_URL}/sliders.json`,
	});

	return slides;
}

export async function queryCategoires() {
	const categories = await axios({
		method: "GET",
		url: `${API_URL}/categories.json`,
	});

	return categories;
}
export async function queryLatestProducts(params) {
	const { limit, orderBy } = params;

	const latestProducts = await axios({
		method: "GET",
		url: `${API_URL}/products.json?orderBy="$key"&limitToFirst=${
			limit || 20
		}`,
	});

	return latestProducts;
}
