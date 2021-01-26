import React, { useState, useEffect } from "react";
import Faker from "faker";
import FormInput from "../../componentsWeb/SmallComponents/Form/FormInput";
import { useSessionStorage } from "../../hooks/useSessionStorage";

const UserAddNewPet = ({ setCurrentPage }) => {
    const [data, setData] = useState({});
    const [pets, setPetsList] = useSessionStorage("pets", []);

    useEffect(() => {
        const initialObj = {
            picture: "",
            name: "",
            height: "",
            weight: "",
            age: "",
        };
        setData(initialObj);
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const newData = {
            ...data,
            [name]: value,
        };
        setData(newData);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const id = Faker.random.number();
        const createdAt = new Date();
        const obj = {
            ...data,
            id,
            createdAt,
        };
        const newPetsList = [obj, ...pets];
        setPetsList(newPetsList);
        setCurrentPage(6);
    };

    return (
        <section className="userAddnewPet">
            <form onSubmit={handleSubmit}>
                {data &&
                    Object.keys(data).map((item) => {
                        return (
                            <FormInput
                                name={item}
                                label={item}
                                value={data[item]}
                                type="text"
                                handleChange={handleChange}
                            />
                        );
                    })}

                <button
                    className="button--1"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Add
                </button>
            </form>
        </section>
    );
};

export default UserAddNewPet;
