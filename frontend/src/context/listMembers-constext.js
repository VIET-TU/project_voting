import { createContext, useContext, useState } from "react";

const listMembersContext = createContext();

const ListMembersProvider = (props) => {
  const [listMembers, setListMembers] = useState([]);
  const value = [listMembers, setListMembers];
  return (
    <listMembersContext.Provider
      value={value}
      {...props}
    ></listMembersContext.Provider>
  );
};

const useListMembers = () => {
  const context = useContext(listMembersContext);
  if (typeof context === "undefined")
    throw new Error("useListMembers must be used within a ListMembersProvider");
  return context;
};

export { ListMembersProvider, useListMembers };
