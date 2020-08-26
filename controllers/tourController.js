const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/tours-simple.json`)
);

class TourController {
  getAllTours(req, res) {
    res.status(200).json({
      success: true,
      result: tours.length,
      data: {
        tours,
      },
    });
  }

  getTourById(req, res) {
    const id = req.params.id;
    res.status(200).json({
      success: true,
      requestedAt: req.requestedAt,
      data: {
        tour: result,
      },
    });
  }

  createTour(req, res) {
    const body = req.body;
    const newId = tours[tours.length - 1].id + 1;
    const bodyWithId = { id: newId, ...body };
    tours.push(bodyWithId);
    const result = fs.writeFileSync(
      `${__dirname}/../data/tours-simple.json`,
      JSON.stringify(tours)
    );
    res.status(201).json({
      success: true,
      data: {
        tour: bodyWithId,
      },
    });
  }

  updateTour(req, res) {
    const body = req.body;
    const id = req.params.id;
    const updated_tours = [...tours];
    let response = undefined;
    updated_tours.forEach((tour, index) => {
      if (tour.id == id) {
        response = {
          ...updated_tours[index],
          ...body,
        };
        updated_tours[index] = {
          ...response,
        };
      }
    });
    const result = fs.writeFileSync(
      `${__dirname}/../data/tours-simple.json`,
      JSON.stringify(updated_tours)
    );
    res.status(202).json({
      success: true,
      data: {
        tour: response,
      },
    });
  }

  deleteTour(req, res) {
    const id = req.params.id;
    const updated_tours = tours.filter((tour) => tour.id != id);
    const result = fs.writeFileSync(
      `${__dirname}/../data/tours-simple.json`,
      JSON.stringify(updated_tours)
    );
    res.status(200).json({
      success: true,
      message: `Successfully deleted tour with id ${id}`,
    });
  }

  checkId(req, res, next, value) {
    if (!tours.filter((tour) => tour.id == value).length) {
      return res.status(404).json({
        success: false,
        message: `Couldnot find a tour with id ${value}. from param checker`,
      });
    }
    next();
  }
}

module.exports = new TourController();
