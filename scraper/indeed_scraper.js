const puppeteer = require('puppeteer');
const fs = require('fs');
async function indeed_scrape(searchQuery){
    const jobList = [];
    const fetchedJobList = [];
    //const fetchedData = 
    await (async () => {
       try{ 
        const browser = await puppeteer.launch({headless:false,defaultViewport:{ width: 1366, height: 768},args:['--start-maximized' ]});
        const page = await browser.newPage();
        await page.goto(`https://www.indeed.com/jobs?q=${searchQuery}`);
        const jobListSelector = '.jobsearch-ResultsList .resultContent';
       function accumulateAllPages(fetchedData)
       {
            if(!fetchedData) return;
            fetchedData.forEach(job=>{
                fetchedJobList.push(job);
            });
       }
        // function to write fetched data to file
        function writeToFile(fetchedData){
            if(!fetchedData) return;
            const fetchedDataJson =  JSON.stringify(fetchedData,null,2);
            fs.writeFile('indeed_job_listings.json',fetchedDataJson,'utf8',()=>{
             console.log("data written to indeed_job_listings.json");
            });
          }
        //recursive function
       async function fetchCurrentPageData(){
            const currentPageJobData = await page.evaluate(async (jobList,jobListSelector)=>{
            const jobListElements =  document.querySelectorAll(jobListSelector);
            const nextPageLink  = document?.querySelector('a[data-testid = "pagination-page-next"]')?.href;
            if(!nextPageLink) return null;
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
            return {jobList,nextPageLink};
        },jobList,jobListSelector);
        //accumulating current Page data into fetchedJobList variable to write it to a file once the browser is closed
        accumulateAllPages(currentPageJobData?.jobList);
        if(currentPageJobData?.nextPageLink) 
        {
            console.log("Going to next Page!");
            await page.goto(currentPageJobData?.nextPageLink);
            // calling it recursively if next page is available
            await fetchCurrentPageData();

        }
       }
       //calling to eval the first page
       await fetchCurrentPageData();
        await browser.close();
        writeToFile(fetchedJobList);
        
    }catch(err){
        console.log(err)
    }
    })();

};
module.exports = indeed_scrape;
