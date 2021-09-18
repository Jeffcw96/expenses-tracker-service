const mongoose = require("mongoose");
const uuid = require("@/utils").uuid

const expensesSchema = new mongoose.Schema({
    ref_id: {
        type: String,
        unique: true,
        immutable: true,
        required: [true, "Missing Ref Id"]
    },
    user_ref_id: {
        type: String,
        required: [true, "Missing User Ref Id"],
        immutable: true,
        unique: true,
    },
    expenses_category_ref_id: {
        type: String,
        required: [true, "Missing Expenses Category Ref Id"],
        immutable: true,
        unique: true,
    },
    currency: {
        type: String
    },
    remarks: {
        type: String
    },
    date: {
        type: Date
    },
    value: {
        type: Number
    },
});

expensesSchema.pre('save', function (next) {
    if (!this.ref_id) {
        this.ref_id = uuid.uuidv1()
    }
    next()
});

const expenses = mongoose.model("Expenses", expensesSchema);
module.exports = expenses