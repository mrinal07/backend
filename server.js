require("dotenv").config();

const express = require("express");

const app = express();

const dbConfig = require("./config/dbConfig");


const portfolioRoute = require("./routes/portfolioRoute");
app.use(express.json());
app.use("/api/portfolio", portfolioRoute);

const port = process.env.PORT || 7331;
app.listen(port, () => {
  console.log("Server running on port on port " + port);
});
