import React, { Fragment, useState, useEffect } from "react";
import WrapperWithNoAds from "../../layout/WrapperWithNoAds";
import UserMain from "./UserMain";
import {
    SideBar,
    UserMainInfo,
    UserMainEditInfo,
    UserOrderList,
    UserOrderDetail,
    UserReviewsList,
    UserReviewDetail,
    UserPetsList,
    UserPetDetail,
    UserAddNewPet,
    UserSuggestion,
} from "../../componentsDash/UserDash";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const User = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [id, setID] = useState(null);
    const userInfo = useSelector((state) => state.user.currentUser);
    const history = useHistory();

    const handleChangePage = (id) => setCurrentPage(id);
    const handleChangeID = (id) => setID(id);

    useEffect(() => {
        if (!userInfo) {
            history.push("/auth");
        }
    }, []);

    useEffect(() => {
        if (!userInfo) {
            history.push("/auth");
        }
    }, [userInfo]);

    const childComponent = [
        <UserMainInfo
            setCurrentPage={handleChangePage}
            setID={handleChangeID}
        />,
        <UserMainEditInfo setCurrentPage={handleChangePage} id={id} />,
        <UserOrderList
            setCurrentPage={handleChangePage}
            setID={handleChangeID}
        />,
        <UserOrderDetail setCurrentPage={handleChangePage} id={id} />,
        <UserReviewsList
            setCurrentPage={handleChangePage}
            setID={handleChangeID}
        />,
        <UserReviewDetail setCurrentPage={handleChangePage} id={id} />,
        <UserPetsList
            setCurrentPage={handleChangePage}
            setID={handleChangeID}
        />,
        <UserPetDetail setCurrentPage={handleChangePage} id={id} />,
        <UserAddNewPet setCurrentPage={handleChangePage} />,
        <UserSuggestion />,
    ][currentPage];

    return (
        <Fragment>
            <section className="userPage">
                <div className="container">
                    <div className="row">
                        <SideBar setCurrentPage={handleChangePage} />
                        <UserMain children={childComponent} />
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default WrapperWithNoAds(User);
