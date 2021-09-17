import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import DeleteButton from "./DeleteButton";

const ListOfObjects = (props) => {
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
            <div className="d-flex gap-4 justify-content-around">
                <h1>Pirate Crew</h1>
                <Link
                    to="/pirate/new"
                    className="btn btn-primary align-self-center"
                >
                    Add Pirate
                </Link>
            </div>
            {somethings.map((pirate) => (
                <div
                    className="border border-dark m-3 p-3 d-flex"
                    key={pirate._id}
                >
                    <img src={pirate.image} alt={pirate.name} height="150"/>
                    <div className="w-100">
                        <h2 className="text-center mb-4">{pirate.name}</h2>
                        <div className="d-flex justify-content-around">
                            <Link
                            to={"/pirate/" + pirate._id}
                            className="btn btn-primary w-25"
                        >
                            View Pirate
                        </Link>
                        <DeleteButton
                            somethingID={pirate._id}
                            deletionResponse={() => removeFromDOM(pirate._id)}
                        />
                        </div>
                        
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListOfObjects;
