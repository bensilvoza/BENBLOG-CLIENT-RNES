import { useState, createContext } from "react";

export const UserContext = createContext();

function UserContextProvider(props) {
  let [userData, setUserData] = useState(undefined);

  function handleUserData(user) {
    setUserData(user);
    return;
  }

  return (
    <UserContext.Provider
      value={{
        userData: userData,
        handleUserData: handleUserData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
