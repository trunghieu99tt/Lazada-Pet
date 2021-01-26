import { atom } from "recoil";
import { Banner as BannerType } from "../../types/types";

export const BannerState = atom<Array<BannerType> | null>({
    key: "banner",
    default: null,
});
