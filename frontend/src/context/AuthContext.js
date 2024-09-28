import { createContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load the user from localStorage when the app loads
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // Safely parse the user data
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        setUser(null); // Reset if parsing fails
      }
    }
  }, []);

  // Function to handle user login and store user data
  const login = (userData) => {
    setUser(userData); // Set user in state
    localStorage.setItem('user', JSON.stringify(userData)); // Store user in localStorage
  };

  // Function to handle user logout and clear user data
  const logout = () => {
    setUser(null); // Clear user from state
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
