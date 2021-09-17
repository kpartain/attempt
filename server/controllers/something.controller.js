const { Something } = require("../models/something.model");
//CREATE
module.exports.create = (request, response) => {
    const { textAttribute, numberAttribute } = request.body;
    Something.create({
        textAttribute,
        numberAttribute,
    })
        .then((newSomethingObject) => response.json(newSomethingObject))
        .catch((errorFound) => response.status(400).json(errorFound));
    // status codes: https://www.restapitutorial.com/httpstatuscodes.html
};
//READ
module.exports.getAll = (request, response) => {
    Something.find({})
        .then((listOfSomethingObjects) => response.json(listOfSomethingObjects))
        .catch((errorFound) => response.json(errorFound));
};
module.exports.getByID = (request, response) => {
    Something.findOne({ _id: request.params.id })
        .then((foundSomethingObject) => response.json(foundSomethingObject))
        .catch((errorFound) => response.json(errorFound));
};
//UPDATE
module.exports.updateByID = (request, response) => {
    Something.findOneAndUpdate({ _id: request.params.id }, request.body, {
        new: true,
        runValidators: true,
    })
        .then((somethingBeingUpdated) => response.json(somethingBeingUpdated))
        .catch((errorFound) => response.status(400).json(errorFound));
};
//DELETE
module.exports.deleteByID = (request, response) => {
    Something.deleteOne({ _id: request.params.id })
        .then((deletionSuccessMessage) => response.json(deletionSuccessMessage))
        .catch((errorInDeletion) => response.json(errorInDeletion));
};