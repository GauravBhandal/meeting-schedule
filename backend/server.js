const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  //   useCreateIndex: true,
});
const connection = mongoose.connection;
connection.on("connected", () => {
  console.log("MongoDB database connection established successfully");
});
connection.on("error", () => {
  console.log("err connecting");
});

const exerciseRouter = require("./routes/exercise");
const participantRouter = require("./routes/participants");

app.use("/exercise", exerciseRouter);
app.use("/participant", participantRouter);

app.listen(port, () => {
  console.log(`Server is running in ${port}`);
});
