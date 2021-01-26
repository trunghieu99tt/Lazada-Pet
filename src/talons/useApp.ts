import { useEffect } from "react";
import { useQuery } from "react-query";

// talons
import { useSetRecoilState } from "recoil";

// utils
import client from "../api/client";

// states
import { productsState } from "../recoil/states/products.state";
import { SiteInfo } from "../recoil/states/webInfo.state";

// types
import { AxiosError } from "axios";
import { Product as TProduct, SiteInfo as TSiteInfo } from "../types/types";

const useApp = () => {
    const productsSetter = useSetRecoilState(productsState);
    const siteInfoSetter = useSetRecoilState(SiteInfo);

    // get all  products for the first time load the website
    const { data: productsData, isLoading: productLoading } = useQuery<
        Array<TProduct>,
        AxiosError
    >("products", async () => {
        const response = await client.get("/products");
        return response.data.data;
    });

    // get site data
    const { data: siteData, isLoading: siteInfoLoading } = useQuery<
        TSiteInfo,
        AxiosError
    >("site-info", async () => {
        const response = await client.get("/site-info");
        return response.data.data.siteInfo[0];
    });

    // when product data changed
    useEffect(() => {
        productsSetter(productsData!);
    }, [productsData, productsSetter]);

    // when site data changed
    useEffect(() => {
        siteInfoSetter(siteData!);
    }, [siteData, siteInfoSetter]);

    return {
        productLoading,
        siteInfoLoading,
    };
};

export { useApp };
