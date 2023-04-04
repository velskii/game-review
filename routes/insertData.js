const express = require("express");
const router = express.Router();

router.get("/insertdata", (req, res) => {
  const UserModel = require("../models/userModel");

  var Greg = new UserModel({
    username: "greg",
    password: "12345",
    firstName: "Greg",
    lastName: "Zhou",
    email: "fzhou30@myseneca.ca",
    isAdmin: true,
  });

  Greg.save((err) => {
    console.log("Error: " + err + ";");
    if (err) {
      console.log("There was an error creating Greg: " + err);
    } else {
      console.log("Greg was created successfully");
    }
    console.log("Get here after saving Greg");
  });
});

module.exports = router;
