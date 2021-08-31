const mongoose = require("mongoose");

var currencySchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
        trim: true
    },
    currency_code: {
        type: String,
        required: true,
        trim: true
    },
    currency_symbol: {
        type: String,
        required: true,
        trim: true
    },
});

var currency = mongoose.model("Currency", currencySchema);

module.exports = currency;