import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import DeleteButton from "./DeleteButton";

const ListOfObjects =(props) => {
    const [somethings, setSomethings] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/somethings")
            .then((res) => {
                setSomethings(res.data);
            })
            .catch((errorFound) => console.log("Error: ", errorFound));
    }, []);

    const removeFromDOM = (thingID) => {
        setSomethings(somethings.filter((thing) => thing._id !== thingID));
    };

    return (
        <div>
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <th>Text Value as Link</th>
                        <th>Number Plain</th>
                        <th>Edit Button</th>
                        <th>Delete Button Component</th>
                    </tr>
                    {somethings.map((thing, index) => (
                        <tr key={index}>
                            <td>
                                <Link to={"/" + thing._id}>
                                    {thing.textAttribute}
                                </Link>
                            </td>
                            <td>{thing.numberAttribute}</td>
                            <td>
                                <button
                                    onClick={(e) =>
                                        navigate("/" + thing._id + "/edit")
                                    }
                                >
                                    Edit
                                </button>
                            </td>
                            <td>
                                <DeleteButton
                                    somethingID={thing._id}
                                    deletionResponse={() =>
                                        removeFromDOM(thing._id)
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListOfObjects;