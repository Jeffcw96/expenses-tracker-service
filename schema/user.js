const {body} = require("express-validator")
const {REF_ID,
       NAME,
       EMAIL_ADDRESS,
       PASSWORD,
       BIRTHDAY,
       AVATAR} = require("@/models/user/constant")

const schema = [
    body(EMAIL_ADDRESS).isEmail(),
    body(PASSWORD).isLength({min:5})
]

module.exports = schema