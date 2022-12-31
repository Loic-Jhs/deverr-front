import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAsContext } from "../types";

export const authContext = createContext<any>({});

function AuthProvider({ children }: React.PropsWithChildren) {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<UserAsContext>({
    access_token: undefined,
    token_type: undefined,
    user_info: undefined,
  });
  const [isLogged, setIsLogged] = useState(false);

  const resetState = () => {
    setAuth({
      access_token: undefined,
      token_type: undefined,
      user_info: undefined,
    });
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
    resetState();
    setIsLogged(false);
  };

  useEffect(() => {
    if (localStorage.length > 0) {
      setAuth({
        access_token: JSON.parse(localStorage.getItem("access_token") ?? ""),
        token_type: JSON.parse(localStorage.getItem("token_type") ?? ""),
        user_info: JSON.parse(localStorage.getItem("user_info") ?? ""),
      });
    }
  }, [isLogged]);

  return (
    <authContext.Provider value={{ auth, setAuth, setIsLogged, resetState, logout }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
