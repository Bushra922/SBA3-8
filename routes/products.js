const express = require('express')
const router = express.Router();

const products = require('../data/products');


//GET - Get all Products
router.get("/", (req, res)=> {
    res.json(products);
})


//POST - Add a new product to database 
router.post("/", (req, res) => {
    if (req.body.productName && req.body.price && req.body.quantity) {
        // if(products.find((prod) => prod.productName == req.body.productName)) {
        //     res.json({error: "Product Name already exists"})
        //     return;
        // }

        const product = {
            id: products[products.length - 1].id + 1,
            productName: req.body.productName,
            price: req.body.price,
            quantity: req.body.quantity,
        };
        products.push(product);
        res.json(products[products.length - 1])
    } else res.json({error: "Insufficient Data"});
});


//GET - get one product
router.get("/:id", (req, res, next)=> {
    //find the product id
    const product = products.find((pr) => pr.id == req.params.id);

    console.log(product);
    //if product exist, display the json data
    if (product) res.json(product);
    else next()
});


//UPDATE - PUT/PATCH - update a product
router.patch("/", (req, res, next)=> {
    const product = products.find((pr, i)=> {
        if(pr.id == req.params.id) {
            for(const key in req.body) {
                products[i][key] = req.body[key];
            }
            return true
        }
    });

    if (product) res.json(product);
    else next();
});


//DELETE - DELETE - delete a particular product
router.delete("/:id", (req, res, next) => {
    const product = products.find((pr, i) => {
        if (pr.id == req.params.id) {
            products.splice(i, 1);
            return true
        }
    });
    if (product) res.json(product)
    else next();
});




module.exports = router;