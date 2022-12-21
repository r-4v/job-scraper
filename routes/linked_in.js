const express = require('express');
const router = express.Router();
router.get("/",async(req,res)=>{
    res.send("You've reached linkedin endpoint");
});

module.exports =  router;