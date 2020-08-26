const express = require("express");
const router = express.Router();

const getAllUsers = (req, res) => {
  res.status(500).json({
    success: false,
    message: "Route yet not defined",
  });
};

const getUserById = (req, res) => {
  res.status(500).json({
    success: false,
    message: "Route yet not defined",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    success: false,
    message: "Route yet not defined",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    success: false,
    message: "Route yet not defined",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    success: false,
    message: "Route yet not defined",
  });
};

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUserById).patch(updateUser).put(deleteUser);

module.exports = router;
