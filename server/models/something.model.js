const mongoose = require("mongoose");
const SomethingSchema = new mongoose.Schema(
    {
        textAttribute: {
            type: String,
            required: [true, "Text attribute is required"],
            minlength: [8, "Text attribute must have at least 8 characters"],
            maxlength: [50, "Text attribute cannot have more than 50 characters"]
        },
        numberAttribute: {
            type: Number,
            required: [true, "Number attribute is required"],
            min: [21, "Number attribute must be at least 21"],
            max: [100, "Number attribute cannot be more than 100"]
        },
    },
    { timestamps: true }
);
module.exports.Something = mongoose.model("Something", SomethingSchema);