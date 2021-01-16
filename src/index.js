const express = require('express')
const app = express()
const port = 8080
const newsArticleModel = require('./connector');


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const onePageArticleCount = 10
// app.get("/newFeeds", async function(req,res){
//     try{
//         let limit = (isNaN(req.query.limit) || null || undefined || req.query.limit < 0) ? 10 : req.query.limit;
//         let offset = (isNaN(req.query.offset) || null || undefined || req.query.offset < 0) ? 0 : req.query.offset;
//         let data = await newsArticleModel.find().skip(Number(offset)).limit(Number(limit));
//         res.send(data);
//     }catch(error){
//         res.send(error.message);
//     }
// });

app.get("/newFeeds",async (req,res)=>{
    let limit = Number(req.query.limit);
    let offset = Number(req.query.offset);
    offset = Number.isNaN(offset) ? 0:offset;
    limit = Number.isNaN(limit) ? onePageArticleCount :limit;
    res.send(await newsArticleModel.find({}).skip(offset).limit(limit));
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
