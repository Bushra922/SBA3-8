const express = require('express')
const router = express.Router()

const users = require('../data/users')


//GET - display all  users;
router.get("/", (req, res)=> {
    res.json(users);
})

///////
router.post("/", (req, res) => {
    if (req.body.users.customerName && req.body.users.review) {
        
        const user = {
            id: users[users.length - 1].id + 1,
            users: req.body.users.customerName,
            users: req.body.users.review
        }; 

        users.push(users);
        res.json(users[users.length - 1])
    } else res.json({error: "Insufficient Data"});
});


// GET 
router.get("/:id", (req, res, next)=> {
    const user = users.find((c) => c.id == req.params.id);

    console.log(user);
        
        if (user) res.json(user);
        else next()
});



//PUT/PATCH 
router.patch("/:id", (req, res, next)=> {
    const user = users.find((c, i)=> {
        if(c.id == req.params.id) {
            for(const key in req.body) {
                users[i][key] = req.body[key];
            }
            return true
        }
    });
    
    if (user) res.json(user);
    else next();
});


//DELETE - DELETE - delete a users
router.delete("/:id", (req, res, next) => {
    const user= users.find((c, i) => {
        if (c.id == req.params.id) {
            users.splice(i, 1);
            return true
        }
    });
    if (user) res.json(user)
    else next();
});






module.exports = router