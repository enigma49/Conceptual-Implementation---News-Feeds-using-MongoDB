const express = require('express')
const app = express()
const port = 8080
const newsArticleModel = require('./connector');


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/newFeeds", async function(req,res){
    try{
        let data = await newsArticleModel.find();
        let limit = (isNaN(req.query.limit) || null || undefined || req.query.limit < 0) ? 10 : req.query.limit;
        let offset = (isNaN(req.query.offset) || null || undefined || req.query.offset < 0) ? 0 : req.query.offset;
        let endValue = parseInt(limit)+parseInt(offset);
        let modifiedData = data.slice(offset, endValue);
        res.send(modifiedData);
    }catch(error){
        res.send(error.message);
    }
});


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;