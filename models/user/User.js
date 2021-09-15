const mongoose = require("mongoose");
const uuid = require("@/utils").uuid
const {REF_ID,
       NAME,
       EMAIL_ADDRESS,
       PASSWORD,
       BIRTHDAY,
       AVATAR} = require("./constant")

const userSchema = new mongoose.Schema({
    [REF_ID]: {
        type: String,
        unique: true,
        immutable: true,
        required: [true, "Missing Ref Id"]
    },
    [NAME]: {
        type: String,
        trim: true
    },
    [EMAIL_ADDRESS]: {
        type: String,
        unique: true,
        required: [true, 'Email Address is required'],
        trim: true,
        immutable: true
    },
    [PASSWORD]: {
        type: String,
        required: true,
        minLength: [8, 'Minimum length of 8 for password'],
    },
    //see can do validations of check input is date or not in middleware
    [BIRTHDAY]: {
        type: Date
    },
    [AVATAR]: {
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