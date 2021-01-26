import { message } from "antd";

const { API_URL_2 } = require("./variables");
const { default: Axios } = require("axios");

const axios = Axios.create({
	baseURL: API_URL_2,
	headers: {
		"Content-Type": "application/json",
	},
});

axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response.status === 401) {
			message.error("Wrong username or password, please check again");
		}
		return error;
	}
);

export default axios;
