const express = require('express');
const app = express();
const PORT = 4444;
const path = require('path')


// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html"));
// });

// app.get("/style.css", (req, res) => {
//     res.sendFile(path.join(__dirname, "style.css"));
// });

app.use(express.static(path.join(__dirname, "public")));

app.use("/", (req, res, next) => {
    console.log("Middleware");
    res.send("Response of the request");
    next();
});

app.listen(PORT, () => {
    console.log("http://localhost:", PORT);
});