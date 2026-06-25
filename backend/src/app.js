const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("NOC Backend API running");
})

module.exports = app;