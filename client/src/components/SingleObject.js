import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

import DeleteButton from "./DeleteButton";

const SingleObject = (props) => {
    const [something, setSomething] = useState({});

    const fetchDataFunction = (id) => {
        axios
            .get("http://localhost:8000/api/somethings/" + id)
            .then((res) => {
                setSomething(res.data);
            })
            .catch((errorFound) => console.log("Error: ", errorFound));
    };

    useEffect(() => {
        fetchDataFunction(props._id);
    }, [props._id]);

    return (
        <div>
            <h1>SINGLE OBJECT PAGE BY ID</h1>
            <p>Text: {something.textAttribute}</p>
            <p>Number: {something.numberAttribute}</p>
            <button onClick={(e) => navigate("/")}>Return Home</button>
            <button onClick={(e) => navigate("/" + something._id + "/edit")}>
                Edit
            </button>
            <DeleteButton
                somethingID={something._id}
                deletionResponse={() => navigate("/")}
            />
        </div>
    );
};

export default SingleObject;