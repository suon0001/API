const router = require("express").Router();
const sign = require("../models/sign");

//CRUD operations


// /api/signs/
//POST
router.post("/", (req, res) => {
    data = req.body;

    sign.insertMany(data)
    .then(data => { req.send(data);})
    .catch(error => { res.status(500).send({ message: "err.message;" }); })
});

//GET

//PUT

//DELETE

module.exports = router;