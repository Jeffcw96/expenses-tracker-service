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
    type: {
        type: String,
        require: true,
        enum: {
            values: ['EXPENSES', 'INCOME'],
            message: "Category only accept EXPENSES or INCOME"
        }
    }
},
    { timestamps: { createdAt: 'created_datetime_utc', updatedAt: 'modified_datetime_utc' } }
);

expensesCategorySchema.pre(/^find/, function (next) {
    this.select("-__v");
    next();
});

expensesCategorySchema.pre('save', function (next) {
    if (!this.ref_id) {
        this.ref_id = uuid.uuidv1()
    }
    next()
});

const expensesCategory = mongoose.model("ExpensesCategory", expensesCategorySchema);
module.exports = expensesCategory