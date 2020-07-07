import faker from "faker";

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
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        updateDate: convertedDate,
        totalRating: Math.round(Math.random() * 100),
        averageRating: Math.round(Math.random() * 5),
        categories: [faker.commerce.product()],
        status: ["Available", "Out of stock", "Unavailable"][
            Math.floor(Math.random() * 3)
        ],
        shortDescription: faker.lorem.paragraph(),
        longDescription: faker.lorem.paragraphs(),
        amount: Math.random() * 100,
    };
});
