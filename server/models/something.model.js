const mongoose = require("mongoose");
var validate = require('mongoose-validator')

var urlValidator = validate({ 
    validator: 'matches',
    arguments: /(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)/,
    message: "IMAGES end with jpg, png, jpeg, or gif"
    })

const SomethingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "NAME is required"]
        },
        image: {
            type: String,
            required: [true, "IMAGE URL is required"],
            validate: urlValidator
        },
        treasure: {
            type: Number,
            required: [true, "TREASURE is required"],
            min: [1, "You can't have a pirate without any TREASRE!"]
        },
        phrase: {
            type: String,
            required: [true, "All pirates have a catch PHRASE..."]
        },
        role: {
            type: String,
            required: [true, "No lollygaggers on our ship! Pick a POSITION."]
        },
        peg: {
            type: Boolean
        },
        patch: {
            type: Boolean
        },
        hook:{
            type: Boolean
        }
        
    },
    { timestamps: true }
);
module.exports.Something = mongoose.model("Something", SomethingSchema);

//captain, first mate, quarter master, boatswain, powder monkey