const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Tour = require("../models/tourModel");

dotenv.config({
  path: "../config.env",
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connection);
    console.log("we are connected to database");
  });

const data = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

const importData = async () => {
  await Tour.create(data);
  console.log("Created Successfully");
};

const deleteData = async () => {
  await Tour.deleteMany();
  console.log("Deleted Successfully");
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
  process.exit();
}
