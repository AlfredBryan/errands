const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const RequestRoute = require("./routes/request")

const app = express();

// connect to mongodb
mongoose.connect(
    process.env.DB_URL,
    {
      useNewUrlParser: true,
      autoIndex: false,
      useUnifiedTopology: true,
    },
    () => {
      console.log("connected to mongoDB");
    }
  );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", RequestRoute)

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`connected to port ${port}`);
});
