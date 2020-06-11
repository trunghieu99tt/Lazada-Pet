import axios from "axios";
import { API_URL } from "../../../variables";

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
