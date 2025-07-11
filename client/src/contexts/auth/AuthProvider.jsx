import { useState,  useEffect, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import AuthContext from './AuthContext';
import { login, register } from '../../api/auth';


const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(window.localStorage.getItem('token') || '');
  const [user, setUser] = useState({});

  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const loginMutation = useMutation({ mutationFn: login, retry: false });
  const registerMutation = useMutation({ mutationFn: register });


  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
    setIsProfileVisible(false);
  };


  useEffect(() => {
    if(token) {
      try {
          const decoded = jwtDecode(token);

          if(decoded.exp * 1000 < Date.now()) {
            setToken('');
            setUser(null);
            localStorage.removeItem('token');
          } else {
            setUser(decoded);
          }
      } catch {
          setToken('');
          setUser(null);
          localStorage.removeItem('token');
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const value = useMemo(
    () => ({
    token,
    setToken,
    user,
    setUser,
    registerMutation,
    loginMutation,
    isProfileVisible,
    setIsProfileVisible,
    logout,
  }), [
    token,
    setToken,
    user,
    setUser,
    registerMutation,
    loginMutation,
    isProfileVisible,
    setIsProfileVisible,
    logout,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;