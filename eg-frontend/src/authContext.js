import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import config from "../src/config.json";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const backEndURL = config.backEndApiURL;
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const signIn = async (signInBody) => {
    return await axios.post(`${backEndURL}/auth/signIn`, signInBody, {
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, backEndURL, accessToken, setAccessToken, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
