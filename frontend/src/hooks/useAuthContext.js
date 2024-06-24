import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext); //just give the value {state,dispatch}

  if (!context) {
    throw Error(
      "useAuthContext must be used inside WorkoutsContextProvider"
    );
  }
  return context;
};
