const express = require('express')
const app = express()
const port = 8080
const newsArticleModel = require('./connector');


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.get("/newFeeds", async function(req,res){
//     try{
//         let limit = (isNaN(req.query.limit) || null || undefined || req.query.limit < 0) ? 10 : req.query.limit;
//         let offset = (isNaN(req.query.offset) || null || undefined || req.query.offset < 0) ? 0 : req.query.offset;
//         let data = await newsArticleModel.find().limit(Number(limit)).skip(Number(offset));
//         res.send(data);
//     }catch(error){
//         res.send(error.message);
//     }
// });

function isNullorUndefined(x){
    if(x == null || x == undefined){
        return true;
    }
    else{
        return false;
    }
}

app.get('/newFeeds',async (req,res)=>{
    const limit = (isNullorUndefined(req.query.limit)||isNaN(req.query.limit) ? 10 : Number(req.query.limit));
    const offset = (isNullorUndefined(req.query.offset)||isNaN(req.query.offset) ? 0 : Number(req.query.offset));
    res.send(await newsArticleModel.find().limit(limit).skip(offset));
   
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;