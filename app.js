const express = require("express");
const fs = require("fs");
const app = express();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`)
);

app.use(express.json());

app.get("/api/tours", (req, res) => {
  res.status(200).json({
    success: true,
    result: tours.length,
    data: {
      tours,
    },
  });
});

app.get("/api/tours/:id", (req, res) => {
  const id = req.params.id;
  const result = tours.filter((tour) => tour.id == id);
  if (result.length) {
    res.status(200).json({
      success: true,
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
});

app.post("/api/tour", (req, res) => {
  const body = req.body;
  const newId = tours[tours.length - 1].id + 1;
  const bodyWithId = { id: newId, ...body };
  tours.push(bodyWithId);
  const result = fs.writeFileSync(
    "./data/tours-simple.json",
    JSON.stringify(tours)
  );
  res.status(201).json({
    success: true,
    data: {
      tour: bodyWithId,
    },
  });
});

app.patch("/api/tour/:id", (req, res) => {
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
      "./data/tours-simple.json",
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
});

app.delete("/api/tour/:id", (req, res) => {
  const id = req.params.id;
  const updated_tours = tours.filter((tour) => tour.id != id);
  if (updated_tours.length !== tours.length) {
    const result = fs.writeFileSync(
      "./data/tours-simple.json",
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
});

app.listen(5000, "localhost", () => {
  console.log("we are listening at 5000...");
});
