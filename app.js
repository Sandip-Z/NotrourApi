const express = require("express");
const app = express();

app.listen(5000, "localhost", () => {
  console.log("we are listening at 5000...");
});
