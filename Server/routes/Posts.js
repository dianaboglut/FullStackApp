const express = require("express");
const router = express.Router();
const {Posts} = require("../models"); 

router.get("/", async (req, res) => {
    //res.send("Hello world!");
    // res.json("Hello world!");
    const listOfPosts = await Posts.findAll(); // wait to return every element from the table
    res.json(listOfPosts);
});

router.post("/", async (req, res) =>{
    const post = req.body; 
    await Posts.create(post);
    res.json(post);
});

module.exports = router;