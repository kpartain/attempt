import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate, useParams } from "@reach/router";

const SingleObject = (props) => {
    const [something, setSomething] = useState({});
    const {id} = useParams();
    useEffect(() => {
        console.log("CURRENT ID", id);
        axios
            .get("http://localhost:8000/api/somethings/" + id)
            .then((res) => {
                setSomething(res.data);
            })
            .catch((errorFound) => console.log("Error: ", errorFound));
    }, [id]);


    const changeHook = () => {
        let pirateCopy = something;
        pirateCopy.hook = !something.hook;
        handleUpdate(pirateCopy);
    };

    const changePeg = () => {
        let pirateCopy = something;
        pirateCopy.peg = !something.peg;
        handleUpdate(pirateCopy);
    };

    const changePatch = () => {
        let pirateCopy = something;
        pirateCopy.patch = !something.patch;
        handleUpdate(pirateCopy);
    };

    const handleUpdate = (pirateObject) => {
        axios.put("http://localhost:8000/api/somethings/" + pirateObject._id, {
            pirateObject
        })
        .then((res) => {
            navigate("/pirate/" + pirateObject._id)
        })
        .catch((errorFound) =>
            console.log("Error in updating body part:", errorFound)
        )
    }

    return (
        <div className="container">
            {something._id}
            <h1 className="text-center">{something.name}</h1>
            <div className="d-flex justify-content-around">
            <div className="w-50">
                <img src={something.image} alt={something.name} width="500"/>
                <h2 className="mt-3 text-center">"{something.phrase}"</h2>
            </div>
            <div className="w-50 px-5">
                <h2 className="text-center">About</h2>
                <p>Position: {something.role}</p>
                <p>Treasures: {something.treasure}</p>
                <div className="d-flex justify-content-between">
                    <div>
                    <p className="mb-5">Peg Leg: {something.peg ? "Yes" : "No"}</p>
                    <p className="mb-5">Eye Patch: {something.patch ? "Yes" : "No"}</p>
                    <p className="mb-5">Hook Hand: {something.hook ? "Yes" : "No"}</p>
                    </div>
                    <div className="d-flex flex-column mx-5 gap-4">
                        <button 
                            className={something.peg ? "btn btn-danger" : "btn btn-success"}
                            onClick={(e) => changePeg(something)}
                        >
                            {something.peg ? "No" : "Yes"}
                        </button>
                        <button 
                            className={something.patch ? "btn btn-danger" : "btn btn-success"}
                            onClick={(e) => changePatch(something)}
                        >
                            {something.patch ? "No" : "Yes"}
                        </button>
                        <button 
                            className={something.hook ? "btn btn-danger" : "btn btn-success"}
                            onClick={(e) => changeHook(something)}
                        >
                            {something.hook ? "No" : "Yes"}
                        </button>
                    </div>
                </div>
                
            </div>
            </div>
            
        </div>
    );
};

export default SingleObject;