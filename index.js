const express = require("express");
const app = express();
const port = 5000;


//SERVE STATIC FILES FROM THE STYLES DIRECTORY
app.use(express.static("./styles"));


//REQUIRE THE FILE SYSTEM MODULE
const fs = require('fs');

//DEFINE THE TEMPLATE ENGINE
app.engine("sba", (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(err);

        //CONVERT THE CONTENT OF THE TEMPLATE TO STRING

        const rendered = content
        .toString()
        .replaceAll("#title#", `${options.title}`)
        .replace("#content#", `${options.content}`);
        return callback(null, rendered);
    });
});

//SPECIFY THE VIEWS DIRECTORY
app.set("views", "./views");

//REGISTER THE BLEKS TEMPLATE ENGINE
app.set("view engine", "sba");

app.get("/", (req, res) => {
    const options = {
        title: "Product Catalogs",
        content: "Lorem ipsum app.engine() dolor sit amet fs module consectetur adipisicing elit. Dolor dolorum accusamus vel mollitia doloribus dicta, ad autem at a, neque ipsa amet? Aliquid corporis libero id ipsa animi minima ratione?"
    };

    res.render("index", options);
});


//GET THE ROUTE TO RENDER THE FORM VIEW
app.get("/form", (req, res) => {
    const options = {
        title: "Product Catalog Information",
        content: "Enter product ID",

    };
    res.render("formView", options);
});



//IMPORT DATA
const products = require("./routes/products");
const posts = require ("./routes/posts");
const users = require("./routes/users")
const forms = require("./routes/forms");

//CUSTOM MIDDLEWARE
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());

app.use('/api/products', products);
app.use('/api/posts', posts);
app.use('/api/users',users);
app.use('/api', forms);
app.use((err, req, res, next) => {
    res.status(500).send(err.message)
})


//ERROR HANDLING MIDDLEWARE
app.get("/", (err, req, res, next)=> {
    res.status(500).send('Something broke!')
})



//HOME ROUTE
app.get("/", (req, res) => {
    res.send("PRODUCT CATALOG");
});



app.listen(port, ()=> {
    console.log(`Server is listening on port: ${port}`);
})