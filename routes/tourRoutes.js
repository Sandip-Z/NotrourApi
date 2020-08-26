const express = require("express");
const fs = require("fs");
const router = express.Router();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    success: true,
    result: tours.length,
    data: {
      tours,
    },
  });
};

const getTourById = (req, res) => {
  const id = req.params.id;
  const result = tours.filter((tour) => tour.id == id);
  if (result.length) {
    res.status(200).json({
      success: true,
      requestedAt: req.requestedAt,
      data: {
        tour: result,
      },
    });
  } else {
    res.status(404).json({
      success: false,
      message: `Couldnot find a tour with id ${id}`,
    });
  }
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
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
  if (tours.filter((tour) => tour.id == id).length) {
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
  } else {
    res.status(404).json({
      success: false,
      message: `Couldnot find a tour with id ${id}`,
    });
  }
};

const deleteTour = (req, res) => {
  const id = req.params.id;
  const updated_tours = tours.filter((tour) => tour.id != id);
  if (updated_tours.length !== tours.length) {
    const result = fs.writeFileSync(
      `${__dirname}/../data/tours-simple.json`,
      JSON.stringify(updated_tours)
    );
    res.status(200).json({
      success: true,
      message: `Successfully deleted tour with id ${id}`,
    });
  } else {
    res.status(404).json({
      success: false,
      message: `Couldnot find a tour with id ${id} to delete`,
    });
  }
};

router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
