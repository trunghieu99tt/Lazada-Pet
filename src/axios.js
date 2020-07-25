const { API_URL_2 } = require("./variables");
const { default: Axios } = require("axios");

const axios = Axios.create({
	baseURL: API_URL_2,
	headers: {
		"Content-Type": "application/json",
	},
});

export default axios;
