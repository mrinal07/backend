require("dotenv").config();

const cors = require("cors");

const express = require("express");

const app = express();

const allowedOrigins = ["https://669b2fa81a7db4733e9ec9d5--roaring-licorice-45898d.netlify.app","https://roaring-licorice-45898d.netlify.app"];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

const dbConfig = require("./config/dbConfig");


const portfolioRoute = require("./routes/portfolioRoute");
app.use(express.json());
app.use("/api/portfolio", portfolioRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server running on port on port " + port);
});
