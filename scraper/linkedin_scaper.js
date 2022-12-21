const puppeteer = require('puppeteer');
function linkedin_scrape(searchQuery){
    (async () => {
        const browser = await puppeteer.launch({headless:false,defaultViewport:{ width: 1366, height: 768},args:['--start-maximized' ]});
        const page = await browser.newPage();
        await page.goto(`https://www.linkedin.com/jobs/search?keywords=${searchQuery}`);
        //console.log("browser open");
       // await browser.close();
    })();
}
    module.exports =  linkedin_scrape;