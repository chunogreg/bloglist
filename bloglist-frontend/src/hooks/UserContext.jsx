import { createContext, useCallback, useState } from "react";
import { getUser, removeUser, saveUser } from "../services/persistentUser";
import { setToken } from "../services/blogs";
import loginServices from "../services/login";

const UserContext = createContext();

export default UserContext;

export const UserContextProvider = (props) => {
  const [user, setUser] = useState();

  const login = async (credentials) => {
    const user = await loginServices.login(credentials);
    if (!user) throw new Error("invalid user");
    setUser(user);
    setToken(user?.token);

    saveUser(user);

    //return user;
  };

  const setUserAfterRefresh = useCallback(async () => {
    const user = getUser();
    if (user) {
      setToken(user.token);
      setUser(user);
    }

    //return user;
  }, []);

  const logout = () => {
    removeUser();
    setToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ login, setUserAfterRefresh, user, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};
