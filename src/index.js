const express = require('express')
const app = express()
const port = 8080
const { newsArticleModel } = require('./connector')

const onePageArticleCount = 10


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/newFeeds",async (req,res)=>{
    let limit = Number(req.query.limit);
    let offset = Number(req.query.offset);
    offset = Number.isNaN(offset) ? 0:offset;
    limit = Number.isNaN(limit) ? onePageArticleCount :limit;
    res.send(await newsArticleModel.find({}).skip(offset).limit(limit));
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
