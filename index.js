const express =  require('express');
const app = express();
const PORT = 1337;
const api_v1 = require('./routes/api_v1');
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.get("/",async(req,res)=>{
    
    res.send("You've reached job-scraper service ");
});
app.use("/api/v1",api_v1);

app.listen(PORT,()=>{
    console.log('server is running at http://localhost:1337 ');
});