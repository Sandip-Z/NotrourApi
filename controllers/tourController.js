const fs = require("fs");
const Tour = require("../models/tourModel");

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../data/tours-simple.json`)
// );

class TourController {
  async getAllTours(req, res) {
    try {
      const allTours = await Tour.find();
      res.status(200).json({
        success: true,
        data: allTours,
      });
    } catch (e) {
      res.status(400).json({
        success: false,
        message: e,
      });
    }
  }

  async getTourById(req, res) {
    const id = req.params.id;
    try {
      const tour = await Tour.findById(id);
      res.status(200).json({
        success: true,
        data: tour,
      });
    } catch (e) {
      res.status(400).json({
        success: false,
        message: e,
      });
    }
  }

  async createTour(req, res) {
    try {
      const newTour = await Tour.create(req.body);
      res.status(201).json({
        success: true,
        data: newTour,
      });
    } catch (e) {
      res.status(400).json({
        success: false,
        message: e,
      });
    }
  }

  async updateTour(req, res) {
    const body = req.body;
    const id = req.params.id;
    try {
      const updatedData = await Tour.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      res.status(202).json({
        success: true,
        data: updatedData,
      });
    } catch (e) {
      res.status(400).json({
        success: false,
        message: e,
      });
    }
  }

  async deleteTour(req, res) {
    const id = req.params.id;
    try {
      const data = await Tour.findByIdAndDelete(id);
      res.status(204).json({
        success: true,
        message: "Successfully deleted data.",
      });
    } catch (e) {
      res.status(400).json({
        success: false,
        message: e,
      });
    }
  }

  checkId(req, res, next, value) {
    // if (!tours.filter((tour) => tour.id == value).length) {
    //   return res.status(404).json({
    //     success: false,
    //     message: `Unable find a tour with id ${value}.`,
    //   });
    // }
    next();
  }

  checkBody(req, res, next) {
    //   if (!req.body.name || !req.body.price) {
    //     return res.status(400).json({
    //       success: "false",
    //       message: "Price and Name are required field",
    //     });
    //   }
    next();
  }
}

module.exports = new TourController();
