const  express = require('express');

const path = require('path');

const cookieParser = require('cookie-parser');

const {ConnectMongoDb} = require('./connect');

const {restrictToLoggedInUaserOnly, chechAuth} = require("./middleware/auth");
 
const urlRoute = require("./Router/url");
const staticRout = require("./Router/staticRouter");

const URL =require('./model/url');

const userRoute = require('./Router/user');


const app = express();
const port = 8001;

ConnectMongoDb('mongodb://localhost:27017/short-url')
.then(()=>console.log("MongoDb Connected.."));

app.set("view engine","ejs");

app.set("views",path.resolve("./views"));

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use(cookieParser());

app.use("/url",restrictToLoggedInUaserOnly, urlRoute);

app.use("/user",userRoute);

app.use("/", chechAuth, staticRout);

app.get('/url/:shortId', async(req, res)=>
{
    const shortId =req.params.shortId;
   const entry= await URL.findOneAndUpdate
    (   {
            shortId
        },
        {
            $push:
            {
            visitHistory: {
                timestamp: Date.now(),
            },
            },
        },
        { 
            new: true
         },

    );
//     if (!entry || !entry.redirectURL) {
//     return res.status(404).send("Short URL not found or missing redirect link");
//   }
  res.redirect(entry.redirectURL);
});


// app.get('/url', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log('Server Started on Port:',port));