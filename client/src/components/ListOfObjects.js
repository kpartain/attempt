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
        <div className="orangeIsh">
            <div className="d-flex justify-content-around darkBrown">
                <h1>Pirate Crew</h1>
                <Link
                    to="/pirate/new"
                    className="btn btn-primary align-self-center"
                >
                    Add Pirate
                </Link>
            </div>
            <div className="container orangeIsh">
            {somethings.map((pirate, index) => (
                <div
                    className="border border-dark m-3 p-3 d-flex whiteBG"
                    key={index}
                >
                    <div className="w-25">
                        <img src={pirate.image} alt={pirate.name} height="150"/>
                    </div>
                    
                    <div className="w-75">
                        <h2 className="text-center mb-4">{pirate.name}</h2>
                        <h4 className="text-center text-white">{pirate._id}</h4>
                        <div className="d-flex justify-content-around">
                        <Link to={"/pirate/" + pirate._id} className="btn btn-primary w-25">View Pirate</Link>
                        <DeleteButton
                            somethingID={pirate._id}
                            deletionResponse={() => removeFromDOM(pirate._id)}
                        />
                        </div>
                        
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default ListOfObjects;
