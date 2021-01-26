import faker from "faker";

const randomDate = (start, end) => {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
};

export const fakeData = [...Array(100)].map((_, idx) => {
    const d = randomDate(new Date(2019, 0, 1), new Date(2022, 0, 1));
    const convertedDate = (d) =>
        `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

    return {
        SaleID: idx + 1,
        name: faker.commerce.price(),
        timeStart: convertedDate(faker.date.past()),
        timeEnd: convertedDate(faker.date.future()),
        status: ["Pending", "Ended", "Running"][Math.floor(Math.random() * 3)],
    };
});
