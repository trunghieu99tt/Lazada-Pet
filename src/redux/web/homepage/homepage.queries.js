import axios from "axios";
import { API_URL, API_URL_2 } from "../../../variables";

export async function querySlides() {
	const slides = await axios({
		method: "GET",
		url: `${API_URL}/sliders.json`,
	});
	return slides;
}

export async function queryCategories() {
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
		// url: `${API_URL}/products.json?orderBy="$key"&limitToFirst=${
		// 	limit || 20
		// }`,

		url: `${API_URL_2}/products`,
	});

	return latestProducts;
}

export async function querySalesAds() {
	const salesAds = await axios({
		method: "GET",
		url: `${API_URL}/salesad.json?orderBy="$key"&limitToFirst=3`,
	});
	return salesAds;
}

export async function queryPopularServices(params) {
	const { limit, orderBy } = params;

	const popularServices = await axios({
		method: "GET",
		url: `${API_URL}/services.json?orderBy="$key"&limitToFirst=${
			limit || 5
		}`,
	});
	return popularServices;
}

export async function queryLatestNews(params) {
	const { limit, orderBy } = params;

	const latestNews = await axios({
		method: "GET",
		url: `${API_URL}/news.json?orderBy="$key"&limitToFirst=${limit || 3}`,
	});
	return latestNews;
}

export async function queryLatestComments(params) {
	const { limit, orderBy } = params;

	const latestComments = await axios({
		method: "GET",
		url: `${API_URL}/comments.json?orderBy="$key"&limitToFirst=${
			limit || 3
		}`,
	});
	return latestComments;
}
