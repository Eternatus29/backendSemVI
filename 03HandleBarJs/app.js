const express = require('express');
const app = express();
const path = require('path');
let blogarr=[]
const port = 4444;
const hbs = require("hbs");
const { v4: uuidv4 } = require('uuid');


app.use(express.urlencoded({ extended:true}));// to parse the data from the url
app.use(express.static(path.join(__dirname, "public")));//to use the static files 
app.set("view engine", "hbs");//to use ejs files
hbs.registerPartials(__dirname + "/views/partials")


app.post("/addblogs", (req, res) => {
    //destructuring
    const { author, category, blog } = req.body
    const obj = {
        author,
        category,
        blog,
        blogId:uuidv4()
    }
    blogarr.push(obj)
    res.redirect("/getblogs")
});

// app.get("/getblogs", (req, res) => {
//     res.render('blogpage'), {
//         firstName: "Shivam",
//         lastName: "Sharma"
//     })
// }

app.get("/getblogs", (req, res) => {
    res.render('blogpage', {
        blogarr
    })
});

app.get("/delete/:blogId", (req, res) => {
    blogarr = blogarr.filter((item) => item.blogId != req.params.blogId);
    res.redirect("/getBlogs");
})

app.get("/update/:blogId", (req, res) => {
    console.log(req.params);
    const updateblog = blogarr.filter((item) => item.blogId == req.params.blogId);
    console.log(updateblog);
    res.render("updateblog", {
        updateblog: updateblog[0]
    });
});

app.post("/updateblog", (req, res) => {
    const { author, category, blog, blogId } = req.body;
    const newObj = {
        author, category, blog, blogId
    }

    blogarr = blogarr.map((item) => {
        if (item.blogId = - blogId) {
            return newObj;
        }
        return item;
    })

    res.redirect("/getblogs");
})

app.listen(port, () => {
    console.log("http://localhost:"+port);
});