import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../libs/wearstock-server/api";

export const INITIAL_USER = {
  id: "",
  name: "",
  email: "",
  avatar: "",
  isAdmin: "",
  links: [],
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false,
};

const AuthContext = createContext(INITIAL_STATE);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.id,
          name: currentAccount.name,
          email: currentAccount.email,
          avatar: currentAccount.avatar,
          isAdmin: currentAccount.isAdmin,
          links: currentAccount.links,
        });
        setIsAuthenticated(true);

        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    /*     if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      navigate("/login");
    } */

    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
