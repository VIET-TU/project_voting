import { useContext, useState } from "react";
import { createContext } from "react";

const allUsersContext = createContext();

const AllUsersProvider = (props) => {
  const [allUser, setAllUser] = useState([]);
  const value = [allUser, setAllUser];
  return (
    <allUsersContext.Provider
      value={value}
      {...props}
    ></allUsersContext.Provider>
  );
};

function useAllUsers() {
  const context = useContext(allUsersContext);
  if (typeof context === "undefined")
    throw new Error("useCount must be used within a CountProvider");
  return context;
}

export { AllUsersProvider, useAllUsers };
