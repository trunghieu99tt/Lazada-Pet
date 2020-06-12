import axios from "axios";
import { API_URL } from "../../../variables";

export async function queryProductCategories() {
	const productCategories = await axios({
		method: "GET",
		url: `${API_URL}/product-categories.json`,
	});

	return productCategories;
}
