const mongoose = require("mongoose");
const uuid = require("@/utils").uuid

const userSchema = new mongoose.Schema({
    ref_id: {
        type: String,
        unique: true,
        immutable: true,
    },
    name: {
        type: String,
        trim: true
    },
    email_address: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        immutable: true
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
},
    { timestamps: { createdAt: 'created_datetime_utc', updatedAt: 'modified_datetime_utc' } }
);

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