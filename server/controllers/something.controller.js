const { Something } = require("../models/something.model");
var validate = require('mongoose-validator')
//CREATE
module.exports.create = (request, response) => {
    const { name, image, treasure, phrase, role, peg, patch, hook } = request.body;
    Something.create({
        name, 
        image, 
        treasure, 
        phrase, 
        role, 
        peg,
        patch,
        hook
    })
        .then((newSomethingObject) => response.json(newSomethingObject))
        .catch((errorFound) => response.status(400).json(errorFound));
    // status codes: https://www.restapitutorial.com/httpstatuscodes.html
};
//READ
module.exports.getAll = (request, response) => {
    Something.find().sort({name: 1})
        .then((listOfSomethingObjects) => response.json(listOfSomethingObjects))
        .catch((errorFound) => response.json(errorFound));
};
module.exports.getByID = (request, response) => {
    Something.findOne({ _id: request.params._id })
        .then((foundSomethingObject) => {
            console.log(foundSomethingObject)
            response.json(foundSomethingObject)
        })
        .catch((errorFound) => response.json(errorFound));
};
//UPDATE
module.exports.updateByID = (request, response) => {
    console.log("REQUESTED ID:", request.params.id);
    Something.findOneAndUpdate({ _id: request.params.id }, request.body, {
        new: true
    })
        .then((somethingBeingUpdated) => {
            console.log(somethingBeingUpdated)
            response.json(somethingBeingUpdated)
        })
        .catch((errorFound) => response.status(400).json(errorFound));
};
//DELETE
module.exports.deleteByID = (request, response) => {
    Something.deleteOne({ _id: request.params.id })
        .then((deletionSuccessMessage) => response.json(deletionSuccessMessage))
        .catch((errorInDeletion) => response.json(errorInDeletion));
};