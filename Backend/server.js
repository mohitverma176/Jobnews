const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
require('dotenv').config({ path: path.join(__dirname, '.env') });
const API_KEY = process.env.API_KEY || "";


app.use(express.json());
app.use(express.static(__dirname));

// Enable CORS for frontend requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

const job = require('./data/data.json');
const job2 = require('./data/job.json');
const job3 = require('./data/job1.json');
const print = require("./newsscrape");

app.post("/search", async (req, res) => {
    const jobName = (req.body && (req.body.jobName || req.body.currtext || req.body.search)) || req.query.jobName || "";
    const searchLower = jobName.trim().toLowerCase();
    
    console.log("User searched:", jobName);
    
    const result1 = (job.data || []).filter((item) => {
        if (!searchLower) return true;
        const titleMatch = item.title && item.title.toLowerCase().includes(searchLower);
        const companyMatch = item.company_name && item.company_name.toLowerCase().includes(searchLower);
        const tagMatch = Array.isArray(item.tags) && item.tags.some(t => t.toLowerCase().includes(searchLower));
        const descMatch = item.description && item.description.toLowerCase().includes(searchLower);
        const locMatch = item.location && item.location.toLowerCase().includes(searchLower);
        return titleMatch || companyMatch || tagMatch || descMatch || locMatch;
    });

    const result2 = (Array.isArray(job2) ? job2 : []).filter((item) => {
        if (!searchLower) return true;
        const titleMatch = item.title && item.title.toLowerCase().includes(searchLower);
        const jobTitleMatch = item.job_title && item.job_title.toLowerCase().includes(searchLower);
        const companyMatch = item.company && item.company.toLowerCase().includes(searchLower);
        const descMatch = item.job_description && item.job_description.toLowerCase().includes(searchLower);
        const skillsMatch = item.education_and_skills && item.education_and_skills.toLowerCase().includes(searchLower);
        const expMatch = item.experience && item.experience.toLowerCase().includes(searchLower);
        const locMatch = item.location && item.location.toLowerCase().includes(searchLower);
        return titleMatch || jobTitleMatch || companyMatch || descMatch || skillsMatch || expMatch || locMatch;
    });

    const result3 = (job3.jobs || []).filter((item) => {
        if (!searchLower) return true;
        const titleMatch = item.title && item.title.toLowerCase().includes(searchLower);
        const companyMatch = item.companyName && item.companyName.toLowerCase().includes(searchLower);
        const catMatch = Array.isArray(item.categories) && item.categories.some(c => c.toLowerCase().includes(searchLower));
        const descMatch = item.description && item.description.toLowerCase().includes(searchLower);
        const excerptMatch = item.excerpt && item.excerpt.toLowerCase().includes(searchLower);
        const locMatch = Array.isArray(item.locationRestrictions) && item.locationRestrictions.some(l => l.toLowerCase().includes(searchLower));
        return titleMatch || companyMatch || catMatch || descMatch || excerptMatch || locMatch;
    });

    const result = [...result1, ...result2, ...result3];
    res.json(result);
});

// Also support GET /search for testing / browser fetch
app.get("/search", (req, res) => {
    const jobName = req.query.jobName || req.query.q || req.query.currtext || "";
    const searchLower = jobName.trim().toLowerCase();
    
    const result1 = (job.data || []).filter((item) => {
        if (!searchLower) return true;
        const titleMatch = item.title && item.title.toLowerCase().includes(searchLower);
        const companyMatch = item.company_name && item.company_name.toLowerCase().includes(searchLower);
        const tagMatch = Array.isArray(item.tags) && item.tags.some(t => t.toLowerCase().includes(searchLower));
        const descMatch = item.description && item.description.toLowerCase().includes(searchLower);
        const locMatch = item.location && item.location.toLowerCase().includes(searchLower);
        return titleMatch || companyMatch || tagMatch || descMatch || locMatch;
    });

    const result2 = (Array.isArray(job2) ? job2 : []).filter((item) => {
        if (!searchLower) return true;
        const titleMatch = item.title && item.title.toLowerCase().includes(searchLower);
        const jobTitleMatch = item.job_title && item.job_title.toLowerCase().includes(searchLower);
        const companyMatch = item.company && item.company.toLowerCase().includes(searchLower);
        const descMatch = item.job_description && item.job_description.toLowerCase().includes(searchLower);
        const skillsMatch = item.education_and_skills && item.education_and_skills.toLowerCase().includes(searchLower);
        const expMatch = item.experience && item.experience.toLowerCase().includes(searchLower);
        const locMatch = item.location && item.location.toLowerCase().includes(searchLower);
        return titleMatch || jobTitleMatch || companyMatch || descMatch || skillsMatch || expMatch || locMatch;
    });

    const result3 = (job3.jobs || []).filter((item) => {
        if (!searchLower) return true;
        const titleMatch = item.title && item.title.toLowerCase().includes(searchLower);
        const companyMatch = item.companyName && item.companyName.toLowerCase().includes(searchLower);
        const catMatch = Array.isArray(item.categories) && item.categories.some(c => c.toLowerCase().includes(searchLower));
        const descMatch = item.description && item.description.toLowerCase().includes(searchLower);
        const excerptMatch = item.excerpt && item.excerpt.toLowerCase().includes(searchLower);
        const locMatch = Array.isArray(item.locationRestrictions) && item.locationRestrictions.some(l => l.toLowerCase().includes(searchLower));
        return titleMatch || companyMatch || catMatch || descMatch || excerptMatch || locMatch;
    });

    const result = [...result1, ...result2, ...result3];
    res.json(result);
});

// Helper to read all news files dynamically
function getAllNews() {
    const dataPath = path.join(__dirname, 'data');
    const news0Path = path.join(dataPath, 'news0.json');
    const news1Path = path.join(dataPath, 'news1.json');
    const news2Path = path.join(dataPath, 'news2.json');
    const news3Path = path.join(dataPath, 'reddit.json');

    const new1 = fs.existsSync(news0Path) ? JSON.parse(fs.readFileSync(news0Path, 'utf8')) : [];
    const new2 = fs.existsSync(news1Path) ? JSON.parse(fs.readFileSync(news1Path, 'utf8')) : [];
    const new3 = fs.existsSync(news2Path) ? JSON.parse(fs.readFileSync(news2Path, 'utf8')) : [];
    const new4 = fs.existsSync(news3Path) ? JSON.parse(fs.readFileSync(news3Path, 'utf8')) : [];

    const combined = [...(Array.isArray(new1) ? new1 : []), ...(Array.isArray(new2) ? new2 : []), ...(Array.isArray(new3) ? new3 : []), ...(Array.isArray(new4) ? new4 : [])];

    // Deduplicate by title/link
    const seen = new Set();
    return combined.filter(item => {
        const key = item.link || item.title;
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

// News search handler
const handleNewsSearch = (req, res) => {
    const query = ((req.body && (req.body.newssearch || req.body.q || req.body.search)) || req.query.newssearch || req.query.q || "").trim().toLowerCase();
    try {
        const allNews = getAllNews();
        const result = allNews.filter((item) => {
            if (!query) return true;
            const titleMatch = item.title && item.title.toLowerCase().includes(query);
            const descMatch = item.description && item.description.toLowerCase().includes(query);
            return titleMatch || descMatch;
        });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// app.post("/serach/news", handleNewsSearch);
app.post("/search/news", handleNewsSearch);
app.get("/search/news", handleNewsSearch);

app.get("/news", async (req, res) => {
    try {
        if (typeof print === "function" && req.query.refresh === "true") {
            try {
                await print();
            } catch (err) {
                console.warn("News scrape error (using cached):", err.message);
            }
        }
        
        const comresult = getAllNews();
        res.json(comresult);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
app.post("/chat",async (req,res)=>{
    try{
        if (!API_KEY) {
            return res.status(500).json({ error: "API_KEY is missing from Backend/.env" });
        }

        const requestBody = req.body.contents ? req.body : {
            contents: [{
                parts: [{ text: req.body.prompt || "" }]
            }],
            generationConfig: {
                maxOutputTokens: req.body.maxOutputTokens,
                temperature: req.body.temperature
            }
        };
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            }
          );
          const data = await response.json();
          console.log("Chat response:", data);
          if (!response.ok) {
              return res.status(502).json({
                  error: data?.error?.message || "Gemini API request failed"
              });
          }
          res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
