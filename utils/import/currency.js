const puppeteer = require('puppeteer');

async function importCurrencyData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(process.env.currencyLookUpUrl);
    const result = await page.evaluate(() => {
        const row1 = document.querySelectorAll('.row1');
        const row2 = document.querySelectorAll('.row2');
        const currencyInfo = [...row1, ...row2]

        const processedCurrency = currencyInfo.reduce((acc, val) => {
            let object = {}
            object.country = val.childNodes[0].innerText
            object.currency_code = val.childNodes[1].innerText
            object.currency_symbol = val.childNodes[4].innerText

            if (!object.country || !object.currency_code || !object.currency_symbol) {
                return acc
            }

            return [...acc, object]
        }, [])

        return processedCurrency
    })

    await browser.close();
    return result
}


process.on('message', async (message) => {
    const result = await importCurrencyData()
    process.send(result)
    process.exit() //terminate process after it's done
})
