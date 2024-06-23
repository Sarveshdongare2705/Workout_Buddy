import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString();
};
const formatDate2 = (isoString) => {
  return formatDistanceToNow(new Date(isoString), { addSuffix: true });
};

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <p>{formatDate(workout.createdAt)+'-'+formatDate2(workout.createdAt)}</p>
      <div onClick={handleClick} className="delete">delete</div>
    </div>
  );
};

export default WorkoutDetails;
