const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

//import routes
const signRoutes = require("./routes/sign");

const authRoutes = require("./routes/auth");

require("dotenv-flow").config();

// parse request of content-type JSON
app.use(bodyParser.json());

mongoose
  .connect(process.env.DBHOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((error) => console.log("Error connecting to MongoDB" + error));

mongoose.connection.once("open", () =>
  console.log("Connected succesfully to MongoDB")
);

//routes
app.get("/api/welcome", (req, res) => {
  res.status(200).send({ message: "Welcome to the Men RESTful API" });
});

//CRUD

app.use("/api/sign", signRoutes);
app.use("/api/user", authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
  console.log("Server is running on port: " + PORT);
});

module.exports = app;
