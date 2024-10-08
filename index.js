require("dotenv").config();
const db = require("./db");

const port = process.env.PORT || 3000;
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.json({ message: "casa" });
})

app.listen(port);
console.log(`Listening on port ${port}`);