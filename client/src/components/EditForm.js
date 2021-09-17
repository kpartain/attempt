import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const EditForm = (props) => {
    const [textAttribute, setTextAttribute] = useState("");
    const [numberAttribute, setNumberAttribute] = useState("");
    const [errors, setErrors] = useState([]);

    //FETCH THE DATA
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/somethings/" + props._id)
            .then((res) => {
                setTextAttribute(res.data.textAttribute);
                setNumberAttribute(res.data.numberAttribute);
            })
            .catch((errorsFound) => console.log("Error: ", errorsFound));
    }, [props._id]);

    //VALIDATIONS AND EDIT SUBMISION
    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios
            .put("http://localhost:8000/api/somethings/" + props._id, {
                textAttribute,
                numberAttribute,
            })
            .then((res) => navigate("/" + props._id))
            .catch((err) => {
                console.log("ERR \n",err);
                console.log("ERR RESP DATA \n",err.response.data.errors);
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message);
                }
                setErrors(errorArr);
            });
    };

    const returnHome = (e) => {
        e.preventDefault();
        navigate("/");
    };
    const resetFields = (e) => {
        e.preventDefault();
        setTextAttribute(props.textAttribute);
        setNumberAttribute(props.numberAttribute);
        setErrors({});
    };

    return (
        <div>
            <h1>EDIT</h1>
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
                    value={textAttribute}
                />
                <p>Attribute 2: NUMBER</p>
                <input
                    type="number"
                    onChange={(e) => setNumberAttribute(e.target.value)}
                    value={numberAttribute}
                />
                <div>
                    <button type="submit">Submit</button>
                    <button onClick={resetFields}>Clear All</button>
                    <button onClick={returnHome}>Cancel Edit</button>
                </div>
            </form>
        </div>
    );
};

export default EditForm;