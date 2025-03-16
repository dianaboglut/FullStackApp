const express = require("express"); // call express from the libbrary. An instance of the framework Express
const app = express(); // an instance of express
const cors = require("cors");

app.use(express.json());
app.use(cors());

// will go through every tabble from models
const db = require("./models");

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);
const userRouter = require("./routes/Users");
app.use("/auth", userRouter);


// Start API
// When we start our API we want at the same time go through every table from models
// check if this exist or create one

db.sequelize.sync().then(() =>{
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});


