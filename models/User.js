const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email_address: {
        type: String,
        unique: true,
        required: [true, 'Email Address is required'],
        trim: true,
        immutable: true
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Minimum length of 8 for password'],
    },
    //see can do validations of check input is date or not in middleware
    birthday: {
        type: Date
    },
    avatar: {
        type: String
    },
});

userSchema.pre(/^find/, function (next) {
    this.select("-__v");
    next();
});

const user = mongoose.model("User", userSchema);

module.exports = user;