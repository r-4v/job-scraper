const express = require('express');
const router = express.Router();
const linkedinRoute = require('./linked_in');
const indeedRoute = require('./indeed');
router.get("/",async (req,res)=>{
    res.send("You've reached api/v1");
});
router.use("/indeed",indeedRoute);
router.use("/linkedin",linkedinRoute);

module.exports = router;
