const randomDate = (start, end) => {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
};

export const fakeData = [...Array(100)].map((_, idx) => {
    const d = randomDate(new Date(2019, 0, 1), new Date(2022, 0, 1));
    const convertedDate = `${d.getDate()}/${
        d.getMonth() + 1
    }/${d.getFullYear()}`;

    return {
        productID: idx + 1,
        name: "Unknown Product",
        price: Math.round(Math.random() * 999),
        updateDate: convertedDate,
        totalRating: Math.round(Math.random() * 100),
        averageRating: Math.round(Math.random() * 5),
        images: [require("../../../static/images/carousel/banner_1.jpg")],
        categories: ["Pet"],
        shortDescripiton:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident, quibusdam. Repudiandae explicabo sapiente, dolorem nesciunt ut magni illo, sint quos impedit enim veniam harum asperiores quidem in necessitatibus, minima quae!",
        longDescription:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident, quibusdam. Repudiandae explicabo sapiente, dolorem nesciunt ut magni illo, sint quos impedit enim veniam harum asperiores quidem in necessitatibus, minima quae!, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident, quibusdam. Repudiandae explicabo sapiente, dolorem nesciunt ut magni illo, sint quos impedit enim veniam harum asperiores quidem in necessitatibus, minima quae!, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident, quibusdam. Repudiandae explicabo sapiente, dolorem nesciunt ut magni illo, sint quos impedit enim veniam harum asperiores quidem in necessitatibus, minima quae!",
        amount: Math.random() * 100,

        status: ["Available", "Out of stock", "Unavailable"][
            Math.floor(Math.random() * 3)
        ],
    };
});
