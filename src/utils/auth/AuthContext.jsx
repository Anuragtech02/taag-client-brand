import { useState, createContext, useEffect } from "react";
import { decodeToken } from "react-jwt";

export const AuthContext = createContext({});

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      setCurrentUser(decodeToken(user));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
