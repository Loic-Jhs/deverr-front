import { createContext } from "react";

import { defaultUser } from "../types/defaultUser";
import User from "../types/User";

const AuthContext = createContext( {
  user: defaultUser,
  setUser: (user: User) => {},
});

export { AuthContext };