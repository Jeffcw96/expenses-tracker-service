const mongoose = require("mongoose");
const uuid = require("@/utils").uuid

const expensesCategorySchema = new mongoose.Schema({
    ref_id: {
        type: String,
        unique: true,
        immutable: true,
    },
    label: {
        type: String,
        trim: true,
        required: true
    },
    icon: {
        type: String,
    },
    user_ref_id: {
        type: String,
        required: [true, "Missing User Ref Id"],
        immutable: true
    },
});

expensesCategorySchema.pre('save', function (next) {
    if (!this.ref_id) {
        this.ref_id = uuid.uuidv1()
    }
    next()
});

const expensesCategory = mongoose.model("ExpensesCategory", expensesCategorySchema);
module.exports = expensesCategory