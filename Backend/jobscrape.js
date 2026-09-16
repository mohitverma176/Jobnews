const request =require('request');
const cheerio=require('cheerio');
const savejson = require('./savejson');
const url="https://www.arbeitnow.com/api/job-board-api";
request (url,(err,response,body)=>{
    if(err){
        console.log(err);
        return;
    }
    const data=JSON.parse(body);
    // savejson(data,"data.json");
    
});
const API_URL = "https://jobs.indianapi.in/jobs";

const options = {
    url: API_URL,
    headers: {
        "X-Api-Key": "YOUR_API_KEY"
    }
};

request(options, (err, response, body) => {

    if (err) {
        console.log(err);
        return;
    }

   const data=JSON.parse(body);
    savejson(data,"job.json");
});

