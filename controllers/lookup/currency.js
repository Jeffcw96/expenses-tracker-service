const { Currency } = require('@/models')

exports.importCurrency = async (data) => {
    try {
        await Currency.create(data)
        console.log("DONE imported currency into lookup ✔️")
    } catch (error) {
        console.log("error", error)
        console.log("Failed imported currency into lookup ⚠️")
    }
}



