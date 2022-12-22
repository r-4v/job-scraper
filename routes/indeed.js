const express = require('express');
const router = express.Router();
const indeed_scrape = require('../scraper/indeed_scraper');
router.get("/",async(req,res)=>{
    res.send("You've reached indeed endpoint");
    const indeed_scrape_data =  await indeed_scrape("sde");
});

module.exports =  router;