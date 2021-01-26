export type User = {
    id: number;
    username: string;
    email: string;
    avatar?: string | null;
    role?: "user" | "admin";
    created_at?: string | null;
    updated_at?: string | null;
};

export type Product = {
    _id: string;
    description?: string;
    meta_title?: string;
    meta_keyword?: string;
    meta_description?: string;
    price: Object;
    mainImage: string;
    imageGallery?: Array<string>;
    category: string;
};

export type SiteInfo = {
    logo: string;
    menu: Array<string>;
    copyRight?: string;
    description?: string;
    meta_title?: string;
    meta_descriptioN?: string;
};

export type Banner = {
    background: string;
    image: string;
    title: string;
    description: string;
    url: string;
};
