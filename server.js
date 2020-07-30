const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const absolutePath = __dirname + "/public/index.html";
const data = require("./public/data.json");

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(absolutePath);
});

app.get("/json", function (req, res) {
    var result = {};
    for (let items in data.extraRunsByEachTeam) {
        for (let elem in data.extraRunsByEachTeam[items]) {
            if (elem === req.query.year)
                result = data.extraRunsByEachTeam[items][elem];
        }
    }
    res.json({ data: result });
});

app.listen(port, function () {
    console.log(`Server running at localhost : ${port}`);
});