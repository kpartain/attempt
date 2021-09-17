const SomethingController = require("../controllers/something.controller");
//use the methods written in your controller file "module.exports._method_name_"
module.exports = function (app) {
    //get all (GET)
    app.get("/api/somethings", SomethingController.getAll);
    //get one by id(GET)
    app.get("/api/somethings/:id", SomethingController.getByID);
    //create one endpoint (POST)
    app.post("/api/something", SomethingController.create);
    //edit one by id(PUT)
    app.put("/api/somethings/:id", SomethingController.updateByID);
    //delete one by id (DELETE)
    app.delete("/api/somethings/:id", SomethingController.deleteByID);
};