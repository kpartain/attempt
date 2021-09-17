import React, { useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";

const NewForm = (props) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [treasure, setTreasure] = useState("");
    const [phrase, setPhrase] = useState("");
    const [role, setRole] = useState("");
    const [peg, setPeg] = useState(true);
    const [patch, setPatch] = useState(true);
    const [hook, setHook] = useState(true);
    const [errors, setErrors] = useState([]);

    //captain, first mate, quarter master, boatswain, powder monkey
    const defaultRoles = [
        "captain",
        "first mate",
        "quarter master",
        "boatswain",
        "powder monkey",
    ];

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(name, image, treasure, phrase, role, peg, patch, hook);
        axios
            .post("http://localhost:8000/api/something", {
                name,
                image,
                treasure,
                phrase,
                role,
                peg,
                patch,
                hook
            })
            .then((res) => navigate("/pirates"))
            .catch((err) => {
                console.log("ERROR HERE", err)
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message);
                }
                setErrors(errorArr);
            });
    };

    return (
        <div className="container p-5">
            <div className="d-flex gap-4">
                <h1>Add Pirate</h1>
                <Link to="/pirates" className="btn btn-primary align-self-center">Crew Board</Link>
            </div>
            
            <form onSubmit={onSubmitHandler}>
                <div>
                    {errors.map((err, index) => (
                        <p key={index}>{err}</p>
                    ))}
                </div>
                {/* MAIN INPUTS */}
                <div className="d-flex justify-content-between">
                    {/* LEFT SIDE */}
                    <div className="w-50">
                        <p>Name</p>
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="name"
                            className="w-50"
                        />
                        <p>Image URL</p>
                        <input
                            type="text"
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="http://www.pirate.com/image.jpeg"
                            className="w-50"
                        />
                        <p># of Treasure Chests: </p>
                        <input
                            type="number"
                            onChange={(e) => setTreasure(e.target.value)}
                            placeholder="1"
                            
                        />
                        <p>Phrase</p>
                        <input
                            type="text"
                            onChange={(e) => setPhrase(e.target.value)}
                            placeholder="yo ho yo ho"
                            className="w-50"
                        />
                    </div>
                    {/* RIGHT SIDE */}
                    <div className="w-50">
                        <p>Position</p>
                        <select onChange={(e) => setRole(e.target.value)}>
                            {defaultRoles.map((position) => (
                                <option key={position} value={position}>{position}</option>
                            ))}
                        </select>
                        {/* BODY MODS */}
                        <div>
                            <div className="d-flex align-items-start gap-2 p-1 mb-1">
                                <input
                                    type="checkbox"
                                    onChange={(e) => setPeg(!peg)}
                                    defaultChecked={peg}
                                />{" "}
                                <p>Peg Leg</p>
                            </div>
                            <div className="d-flex align-items-start gap-2 p-1 mb-1">
                                <input
                                    type="checkbox"
                                    onChange={(e) => setPatch(!patch)}
                                    defaultChecked={patch}
                                />{" "}
                                <p>Eye Patch</p>
                            </div>
                            <div className="d-flex align-items-start gap-2 p-1 mb-1">
                                <input
                                    type="checkbox"
                                    onChange={(e) => setHook(!hook)}
                                    defaultChecked={hook}
                                />{" "}
                                <p>Hook Hand</p>
                            </div>
                        </div>

                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewForm;
