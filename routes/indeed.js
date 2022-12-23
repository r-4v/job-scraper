const express = require('express');
const router = express.Router();
const indeed_scrape = require('../scraper/indeed_scraper');
router.get("/",async(req,res)=>{
    res.send("You've reached indeed endpoint");
    await indeed_scrape("web dev");
});

module.exports =  router;