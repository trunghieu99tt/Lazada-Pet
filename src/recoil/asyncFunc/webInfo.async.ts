import client from "../../api/client";

const getSiteInfo = async () => {
    const response = await client.get("/site-info");
    return response.data.data;
};

export { getSiteInfo };
