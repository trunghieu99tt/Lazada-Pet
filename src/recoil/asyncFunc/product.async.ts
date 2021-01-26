import client from "../../api/client";

const getProductInfo = async (productId: string) => {
    const response = await client.get("/products", {
        params: {
            id: productId,
        },
    });

    return response.data.data;
};

const getAllProducts = async () => {
    const response = await client.get("/products");
    return response.data.data;
};

export { getProductInfo, getAllProducts };
