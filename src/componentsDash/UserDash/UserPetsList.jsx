import React, { useEffect, useState } from "react";
import Faker from "faker";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import SearchDash from "../../componentsWeb/SmallComponents/SearchDash";

const UserPetsList = ({ setID, setCurrentPage }) => {
    const mockData = [...Array(5)].map(() => ({
        id: Faker.random.number(),
        picture: Faker.image.animals(),
        name: Faker.name.firstName(),
        createdAt: Faker.date.past(),
        height: Faker.random.number(1),
        weight: Faker.random.number(30),
        type: Faker.commerce.product(),
        age: Faker.random.number(3),
    }));

    const [data, setData] = useSessionStorage("pets", []);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (!data || data.length === 0) {
            setData(mockData);
        }
    }, []);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const handleSearchInput = (event) => {
        const { value } = event.target;
        const searchResult = data?.filter((item) => {
            const name = item?.name?.toLowerCase();
            return name.includes(value.toLowerCase());
        });
        setFilteredData(searchResult);
    };

    return (
        <section className="userPetsList">
            <header className="userPetsList-header">
                <h3>Pets List ({data?.length || 0})</h3>

                <SearchDash
                    name="Search Pet by name"
                    handleOnChange={handleSearchInput}
                />

                <button className="button--1" onClick={() => setCurrentPage(8)}>
                    Add New Pet
                </button>
            </header>

            {(filteredData?.length > 0 &&
                filteredData.map((item) => (
                    <div className="group-container userPetsList-item">
                        <figure className="userPetsList-item__image-container">
                            <img
                                src={item.picture}
                                alt={item.name}
                                className="userPetsList-item__image"
                            />
                            <figcaption className="userPetsList-item__info">
                                <p className="userPetsList-item__name">
                                    Name: <span>{item.name || ""}</span>
                                </p>
                                <p className="userPetsList-item__type">
                                    Type: {item.type || ""}
                                </p>
                                <p className="userPetsList-item__age">
                                    Age: {item.age}
                                </p>

                                <div className="userPetsList-item__statistic">
                                    <p className="userPetsList-item__height">
                                        Height: {item.height}
                                    </p>
                                    <p className="userPetsList-item__weight">
                                        Weight: {item.weight}
                                    </p>
                                </div>
                            </figcaption>
                        </figure>

                        <button
                            className="button--1"
                            onClick={() => {
                                setID(item.id);
                                setCurrentPage(7);
                            }}
                        >
                            View Pet
                        </button>
                    </div>
                ))) || <p>No result found</p>}
        </section>
    );
};

export default UserPetsList;
