import * as React from "react";
import { useRecoilValueLoadable } from "recoil";

// states
import { allProducts } from "../../recoil/states/products.state";

const Home = () => {
    const products = useRecoilValueLoadable(allProducts);

    console.log("products", products);

    switch (products.state) {
        case "hasValue":
            return <div>Hello World</div>;
        case "loading":
            return <div>Loading...</div>;
        case "hasError":
            throw products.contents;
    }
};

export default Home;
