const uuid = require('uuid')

function uuidv1() {
    return uuid.v1()
}

function uuidv4() {
    return uuid.v4()
}

module.exports = {
    uuidv1,
    uuidv4
}