
import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const NewForm = (props) => {
    const [textAttribute, setTextAttribute] = useState("");
    const [numberAttribute, setNumberAttribute] = useState("");
    const [errors, setErrors] = useState([]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(textAttribute, numberAttribute);
        axios
            .post("http://localhost:8000/api/something", {
                textAttribute,
                numberAttribute,
            })
            .then((res) => navigate("/"))
            .catch((err) => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message);
                }
                setErrors(errorArr);
            });
    };
    return (
        <div>
            <h1>NEW</h1>
            <form onSubmit={onSubmitHandler}>
                <div>
                    {errors.map((err, index) => (
                        <p key={index}>{err}</p>
                    ))}
                </div>
                <p>Attribute 1: TEXT</p>
                <input
                    type="text"
                    onChange={(e) => setTextAttribute(e.target.value)}
                    placeholder="MUST HAVE 8-50 chars"
                />
                <p>Attribute 2: NUMBER</p>
                <input
                    type="number"
                    onChange={(e) => setNumberAttribute(e.target.value)}
                    placeholder="21.100"
                />
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default NewForm;