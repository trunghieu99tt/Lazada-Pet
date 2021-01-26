import React, { useEffect, useState } from "react";
import Loader1 from "../../componentsWeb/SmallComponents/Loader1";
import Axios from "axios";
import { API_URL_1 } from "../../variables";
import Rating from "../../componentsWeb/SmallComponents/Rating";
import { dateConverter } from "../../utils/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { useSessionStorage } from "../../hooks/useSessionStorage";

const UserPetDetail = ({ id }) => {
    const [petsList, setData] = useSessionStorage("pets");

    if (!petsList) return <Loader1 />;

    const data = petsList?.find((item) => item.id === id);

    return (
        <section className="userPetDetail">
            <div className="group-container">
                <figure className="userPetDetail-top">
                    <img
                        src={data?.picture}
                        alt={data?.name}
                        className="userPetDetail__image"
                    />
                    <figcaption className="userPetDetail__detail">
                        <h3 className="userPetDetail__name">
                            Name: {data?.name}
                        </h3>
                        <p className="userPetDetail__age">Age: {data?.age}</p>
                        <p className="userPetDetail__type">
                            Type: {data?.type}
                        </p>
                        <p className="userPetDetail__height">
                            Height: {data?.height}
                        </p>
                        <p className="userPetDetail__weight">
                            Weight: {data?.weight}
                        </p>
                    </figcaption>
                </figure>
            </div>
        </section>
    );
};

export default UserPetDetail;
