const request = require("request");
const xml2js = require("xml2js");
const savejson = require("./savejson");

// const RSS_URL = "https://feeds.arstechnica.com/arstechnica/index";

function getNews(RSS_URL) {
    
    return new Promise((resolve, reject) => {
        
        request(RSS_URL, async (err, response, body) => {
            
            if (err) {
                reject(err);
                return;
            }
            
            if (response.statusCode !== 200) {
                reject(
                    new Error(`Request failed: ${response.statusCode}`)
                );
                return;
            }
            
            try {
                
                const result = await xml2js.parseStringPromise(body);
                
                const articles = result.rss.channel[0].item.map(item => {
                    
                    return {
                        title: item.title[0],
                        link: item.link[0],
                        date: item.pubDate ? item.pubDate[0] : "",
                        description: item.description
                        ? item.description[0]
                        : ""
                    };
                    
                });
                    
                resolve(articles);

            } catch (error) {
                reject(error);
            }
            
        });
        
    });
}
async function print() {
    for (let i = 0; i < 3; i++) {
        let RSS_URL = "";
        if (i === 0) {
            RSS_URL = "https://feeds.arstechnica.com/arstechnica/index";
        } else if (i === 1) {
            RSS_URL = "https://feeds.arstechnica.com/arstechnica/technology-lab";
        } else {
            RSS_URL = "https://www.wired.com/feed/tag/ai/latest/rss";
        }
        try {
            const result = await getNews(RSS_URL);
            savejson(result, `news${i}.json`);
        } catch (e) {
            console.error(`Failed to fetch RSS for ${RSS_URL}:`, e.message);
        }
    }
}
// print();
module.exports=print;