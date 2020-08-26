class UserController {
  getAllUser(req, res) {
    res.status(500).json({
      success: false,
      message: "Route yet not defined",
    });
  }

  getUserById(req, res) {
    res.status(500).json({
      success: false,
      message: "Route yet not defined",
    });
  }

  createUser(req, res) {
    res.status(500).json({
      success: false,
      message: "Route yet not defined",
    });
  }

  updateUser(req, res) {
    res.status(500).json({
      success: false,
      message: "Route yet not defined",
    });
  }

  deleteUser(req, res) {
    res.status(500).json({
      success: false,
      message: "Route yet not defined",
    });
  }
}

module.exports = new UserController();
