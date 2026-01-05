import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if(storedToken && storedUser){
        setUser(storedUser);
        setToken(storedToken);
        setIsAuthenticated(true)
    }
  }, []);

  useEffect(() => {
    if(!token) return;

    const decoded = jwtDecode(token);
    const expiresIn = decoded.exp * 1000 - Date.now();

    if(expiresIn <= 0){
        logout();
        return;
    }

    const timeout = setTimeout(() => {
        logout();
    }, expiresIn);

    return () => clearTimeout(timeout);

  }, [token]);

  const refreshUser = (userData) => {
      localStorage.removeItem('user');
      localStorage.setItem('user', userData);
      setUser(userData);
  }

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
