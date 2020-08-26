const express = require("express");
const fs = require("fs");
const app = express();
const morgan = require("morgan");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`)
);

//middlewares

app.use(morgan("dev"));

app.use(express.json());

app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

//mounting routes

const tourRouter = express.Router();
const userRouter = express.Router();

//routes handlers
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

const postTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
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
};

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

//routes

// app.get("/api/tours", getAllTours );

// app.get("/api/tour/:id", getTourById );

// app.post("/api/tour", postTour);

// app.patch("/api/tour/:id",updateTour );

// app.delete("/api/tour/:id", deleteTour);

tourRouter.route("/").get(getAllTours).post(postTour);
tourRouter.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour);

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

app.use("/api/user", userRouter);
app.use("/api/tour", tourRouter);

app.listen(5000, "localhost", () => {
  console.log("we are listening at 5000...");
});
