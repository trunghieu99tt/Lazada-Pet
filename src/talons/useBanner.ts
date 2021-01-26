import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { Banner as TBanner } from "../types/types";
import client from "../api/client";
import { BannerState } from "../recoil/states/banners.state";
import { AxiosError } from "axios";

export const useBanner = () => {
    const bannerSetter = useSetRecoilState(BannerState);

    const { data, isLoading, error } = useQuery<Array<TBanner>, AxiosError>(
        "banner",
        async () => {
            const response = await client.get("/banners");
            return response?.data?.data || [];
        }
    );

    useEffect(() => {
        bannerSetter(data!);
    }, [data, bannerSetter]);

    return { isLoading, error };
};
