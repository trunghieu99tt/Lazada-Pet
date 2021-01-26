import { atom } from "recoil";
import { SiteInfo as SiteInfoType } from "../../types/types";

export const SiteInfo = atom<SiteInfoType | null>({
    key: "siteInfo",
    default: null,
});
