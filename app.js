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

app.listen(5000, "localhost", () => {
  console.log("we are listening at 5000...");
});
