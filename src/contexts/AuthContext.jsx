import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem('tiktok_access_token');
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      if (accessToken) {
        try {
          // Mock validation - in real app, call TikTok API
          await new Promise(resolve => setTimeout(resolve, 500));
          setUser({ id: 'mock_user_id', name: 'TikTok Advertiser' });
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };

    validateToken();
  }, [accessToken]);

  const login = (token) => {
    localStorage.setItem('tiktok_access_token', token);
    setAccessToken(token);
    setUser({ id: 'mock_user_id', name: 'TikTok Advertiser' });
  };

  const logout = () => {
    localStorage.removeItem('tiktok_access_token');
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};