const request = (url, option) => {
	return fetch(url, option)
		.then((response) => response.json())
		.catch((err) => console.log("err", err));
};

export default request;
