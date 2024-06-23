const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 }); //{} empty as we need all (-1 is descending order)
  res.status(200).json(workouts);
};

//get single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  //before going ahead check if the id is actually a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    //do return else it will run rest of code
    return res.status(404).json({ error: "No such workout found" });
  }
  res.status(200).json(workout);
};

//create new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFeilds = []
  if(!title){emptyFeilds.push('Title')}
  if(!load){emptyFeilds.push('Load')}
  if(!reps){emptyFeilds.push('Reps')}
  if(emptyFeilds.length > 0){
    return res.status(400).json({error : `Please fill in the given feilds: ${emptyFeilds}` , emptyFeilds})
  }

  //add doc to db
  try {
    const workout = await Workout.create({
      title,
      reps,
      load,
    });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    //do return else it will run rest of code
    return res.status(404).json({ error: "No such workout found" });
  }

  res.status(200).json(workout);
};

//update a workout
const updateWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body
    }
  ); //2params ---> finding criteria , updating part

  if (!workout) {
    //do return else it will run rest of code
    return res.status(404).json({ error: "No such workout found" });
  }

  res.status(200).json(workout);
};

//export functions
module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
