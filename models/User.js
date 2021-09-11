const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email_address: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    //see can do validations of check input is date or not in middleware
    birthday: {
        type: Date
    },
    avatar: {
        type: String
    },
});

const user = mongoose.model("User", userSchema);

module.exports = user;