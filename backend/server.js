require("dotenv").config();

const express = require("express");
const workoutRoutes = require("./routes/workouts");
const { default: mongoose } = require("mongoose");

//express app
const app = express();
app.use(express.json());

//routes
app.use("/api/workouts", workoutRoutes);

//connect to db
//async in nature it turns to promise
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Conneted to db & Listening on port ${process.env.PORT} !!!!!!!`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//test
app.get("/", (req, res) => {
  res.json({ mssg: "app urls are working fine." });
});
