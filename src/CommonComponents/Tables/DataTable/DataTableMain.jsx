import {
    faEdit,
    faSort,
    faTrash,
    faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import React from "react";

const { confirm } = Modal;

const DataTableMain = ({
    tableHeadData,
    tableData,
    badges,
    sortDataHandler,
    setCurrentPage,
    pageID,
    setID,
}) => {
    const tableHead = tableHeadData.map(
        ({ width, name, sortable, att, isDate }) => {
            return (
                <th
                    className="sorting"
                    key={name}
                    style={{ width }}
                    onClick={
                        sortable
                            ? () => sortDataHandler({ att, name, isDate })
                            : null
                    }
                >
                    {name}
                    {sortable && <FontAwesomeIcon icon={faSort} />}
                </th>
            );
        }
    );

    return (
        <div className="table-responsive data-table-main">
            <div className="row">
                <div className="col-sm-12">
                    <table
                        id="order-listing"
                        className="table dataTable no-footer"
                        role="grid"
                        aria-describedby="order-listing_info"
                    >
                        <thead>
                            <tr role="row">{tableHead}</tr>
                        </thead>
                        <tbody>
                            {tableData?.length > 0 &&
                                tableData.map((item) => {
                                    const badgeClass =
                                        badges?.length > 0 &&
                                        badges.find(
                                            (e) => e[0] === item.status
                                        );

                                    return (
                                        <tr
                                            role="row"
                                            className="odd data-table-main__row"
                                            key={`${item.name}-${item.id}`}
                                        >
                                            {tableHeadData.map(
                                                ({ att }, idx) => {
                                                    return (
                                                        att && (
                                                            <td key={idx}>
                                                                {att !==
                                                                "status" ? (
                                                                    item[att]
                                                                ) : (
                                                                    <label
                                                                        className={`badge ${badgeClass[1]}`}
                                                                    >
                                                                        {
                                                                            item[
                                                                                att
                                                                            ]
                                                                        }
                                                                    </label>
                                                                )}
                                                            </td>
                                                        )
                                                    );
                                                }
                                            )}

                                            <td>
                                                <div
                                                    onClick={() => {
                                                        setCurrentPage(pageID);
                                                        setID(
                                                            item.id ||
                                                                item.productID
                                                        );
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEye}
                                                        className="data-table-icons"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DataTableMain;
