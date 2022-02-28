const router = require("express").Router();
const Signs = require("../models/sign");

//CRUD operations


// /api/signs/
//POST



router.post("/create", (req, res) => {
    data = req.body;
    console.log(data)

    Signs.insertMany(data)
    .then(data => { 
        
        if(data) {
            res.send(data)
    }})
    .catch(error => { res.status(500).send({ message: error.message }); })
});



    


    




//GET

//PUT

//DELETE

module.exports = router;