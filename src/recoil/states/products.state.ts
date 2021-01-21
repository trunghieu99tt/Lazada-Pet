import { atom, selector, selectorFamily } from "recoil";

// types
import { Product } from "../../types/types";

// async functions
import { getAllProducts, getProductInfo } from "../asyncFunc/product.async";

export const productsState = atom<Array<Product> | null>({
    key: "user",
    default: null,
});

export const allProducts = selector<Array<Product> | null>({
    key: "allProduct",
    get: async ({ get }) => {
        const products = await getAllProducts();
        return products;
    },
});

export const singleProduct = selectorFamily<Product | null, string>({
    key: "singleProduct",
    get: (productId) => async ({ get }) => {
        const products = get(productsState);
        const existedProduct = products?.find((item) => item._id === productId);
        if (existedProduct) return existedProduct;
        const productFromBackend = await getProductInfo(productId);
        return productFromBackend;
    },
});
