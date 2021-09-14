const mongoose = require("mongoose");
const uuid = require("@/utils").uuid

const userSchema = new mongoose.Schema({
    ref_id: {
        type: String,
        unique: true,
        immutable: true,
        required: [true, "Missing Ref Id"]
    },
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

userSchema.pre('save', function (next) {
    if (!this.ref_id) {
        this.ref_id = uuid.uuidv1()
    }
    next()
});


const user = mongoose.model("User", userSchema);

module.exports = user;