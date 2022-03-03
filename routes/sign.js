const router = require("express").Router();
const Signs = require("../models/sign");
const { verifyToken } = require("../validation"); 

//CRUD operations

// /api/signs/
//POST

router.post("/", verifyToken, (req, res) => {
  data = req.body;
  console.log(data);
  Signs.insertMany(data)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

//GET

router.get("/", (req, res) => {
  Signs.find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

//READ the signs that have lucks
router.get("/inLuck", (req, res) => {
  Signs.find({ inLuck: true })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

//Specific sign of the zodiac
router.get("/:id", (req, res) => {
  Signs.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

//PUT

//Update a specific sign
router.put("/:id", verifyToken, (req, res) => {
  const id = req.params.id;

  Signs.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot update zodiac sign with id=" +
            id +
            ". Maybe zodiac sign was not found!",
        });
      } else {
        res.send({
          message: "Status of the zodiac sign was succesfully updated",
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error updating zodiac sign with id=" + id });
    });
});

//DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Signs.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot delete zodiac sign with id=" +
            id +
            ". Maybe zodiac sign was not found!",
        });
      } else {
        res.send({
          message: "Status of the zodiac sign was succesfully deleted",
        });
      }
    })

    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error deleting zodiac sign with id=" + id });
    });
});
module.exports = router;
