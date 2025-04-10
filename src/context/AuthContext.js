import { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      API.defaults.headers.common['Authorization'] =' Bearer ${token}';
      API.get('/api/auth/me')
        .then(response => setUser(response.data))
        .catch(() => {
          localStorage.removeItem('token');
          delete API.defaults.headers.common['Authorization'];
        });
    }
  }, []);

  const login = async (email, password) => {
    const response = await API.post('/api/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    API.defaults.headers.common['Authorization'] = 'Bearer ${response.data.token}';
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete API.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
