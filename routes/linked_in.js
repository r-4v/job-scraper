const express = require('express');
const router = express.Router();
const linkedin_scrape = require('../scraper/linkedin_scaper');
router.get("/",async(req,res)=>{
    res.send("You've reached linkedin endpoint");
    linkedin_scrape("mern");
});

module.exports =  router;