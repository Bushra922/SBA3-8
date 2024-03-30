const express = require('express');
const router = express.Router();
const products = require('../data/products');
// const products = require("../routes/productRoutes");




router.get("/:id", (req, res) => {
        //find the product with specified id
    const productId = parseInt(req.params.id);

    
        // Find the product with the specified ID
        const product = products.find((pr) => pr.id === productId);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: "Product not found" });
        }

});



module.exports = router;