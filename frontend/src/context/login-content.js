import { useContext, useState } from "react";
import { createContext } from "react";

const loginUserContext = createContext();

const LoginUserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState([]);
  const value = [currentUser, setCurrentUser];
  return (
    <loginUserContext.Provider
      value={value}
      {...props}
    ></loginUserContext.Provider>
  );
};

function useLoginUser() {
  const context = useContext(loginUserContext);
  if (typeof context === "undefined")
    throw new Error("useCount must be used within a CountProvider");
  return context;
}

export { LoginUserProvider, useLoginUser };
