const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("./dist/beartender"));

app.get("/*", function(req, res) {
    res.sendFile("index.html", {root: "dist/beartender/"}
    );
});

app.listen(process.env.PORT || 4200);