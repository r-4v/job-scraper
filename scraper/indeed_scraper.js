const puppeteer = require('puppeteer');

function indeed_scrape(searchQuery){
    (async () => {
        const browser = await puppeteer.launch({headless:false,defaultViewport:{ width: 1366, height: 768},args:['--start-maximized' ]});
        const page = await browser.newPage();
        await page.goto(`https://www.indeed.com/jobs?q=${searchQuery}`);
        //console.log("browser open");
       // await browser.close();
    })();
};
module.exports = indeed_scrape;
