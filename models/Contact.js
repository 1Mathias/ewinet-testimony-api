const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
        },
        subject: {
            type: String,

        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);

//name
//email
//subject
//details