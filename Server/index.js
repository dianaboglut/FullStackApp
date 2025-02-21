const express = require('express') // call express from the libbrary. An instance of the framework Express
const app = express() // an instance of express


// Start API
app.listen(3001, () => {
    console.log("Server running on port 3001");
});



