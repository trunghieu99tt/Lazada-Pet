import axios from "axios";
import { API_URL } from "../../variables";

export async function queryMenu() {
	return axios({
		method: "GET",
		url: `${API_URL}/menu.json`,
	});
}
