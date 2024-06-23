import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)   //just give the value {state,dispatch}

    if(!context){
        throw Error('useWorkoutsContext must be used inside WorkoutsContextProvider')
    }
    return context
}