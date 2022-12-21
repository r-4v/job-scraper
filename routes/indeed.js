const express = require('express');
const router = express.Router();

router.get("/",async(req,res)=>{
    res.send("You've reached indeed endpoint");
});

module.exports =  router;