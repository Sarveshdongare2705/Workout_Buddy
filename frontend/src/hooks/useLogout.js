import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
  const navigate = useNavigate()
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext() //just change name using : 
  const logout = () => {
    //remove user from local storage
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    workoutsDispatch({type : 'SET_WORKOUTS' , payload : null})
    navigate('/login')
  };

  return { logout };
};
