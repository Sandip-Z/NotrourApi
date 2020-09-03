const express = require("express");
const router = express.Router();

const tourController = require("../controllers/tourController");
const { route } = require("./userRoutes");

router.param("id", tourController.checkId);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
