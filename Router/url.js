const express = require("express");
const {
    HandleShortUrl,
    handleAnalytics,
}=require("../Controller/url");

const router=express.Router();

router.post("/", HandleShortUrl);

router.get("/analytics/:shortId", handleAnalytics);

module.exports=router;