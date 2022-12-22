const puppeteer = require('puppeteer');
const fs = require('fs');
async function indeed_scrape(searchQuery){
    const jobList = [];
    const fetchedData = await (async () => {
       try{ 
        const browser = await puppeteer.launch({headless:false,defaultViewport:{ width: 1366, height: 768},args:['--start-maximized' ]});
        const page = await browser.newPage();
        await page.goto(`https://www.indeed.com/jobs?q=${searchQuery}`);
        const jobListSelector = '.jobsearch-ResultsList .resultContent';
        //write a recursive function to make this work with pagination
        const jobData =  page.evaluate((jobList,jobListSelector)=>{
            const jobListElements =  document.querySelectorAll(jobListSelector);
            jobListElements.forEach((element)=>{
                    let jobTitle = element.querySelector(".jobTitle span").innerText;
                    let companyName = element.querySelector(".companyName a")?.innerText;
                    let rating  = element.querySelector(".ratingNumber span")?.innerText;
                    let location = element.querySelector(".companyLocation")?.innerText;
                    let salary = element.querySelector(".attribute_snippet")?.innerText;
                    if(!salary){
                        salary = element.querySelector(".estimated-salary span")?.innerText;
                    }

                    jobList.push({jobTitle:jobTitle,
                        companyName:companyName,
                        rating:rating,
                        location:location,
                        salary:salary});
            });
            return jobList;
        },jobList,jobListSelector);
        await browser.close();
        //console.log(jobData);
        return jobData;
    }catch(err){
        console.log(err)
    }
    })();
   //console.log("fetchedData is: ");
   //console.log(fetchedData);
   // write to file system
   const fetchedDataJson =  JSON.stringify(fetchedData,null,2);
   fs.writeFile('indeed_job_listings.json',fetchedDataJson,'utf8',()=>{
    console.log("data written to indeed_job_listings.json");
   });
   return fetchedData;
};
module.exports = indeed_scrape;
