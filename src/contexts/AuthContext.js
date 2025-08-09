import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);
    
    try {
      const token = apiService.getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      const result = await apiService.getCurrentAdmin();
      
      if (result.success) {
        setAdmin(result.admin);
        setIsAuthenticated(true);
        localStorage.setItem('admin_data', JSON.stringify(result.admin));
      } else {
        // Токен невалиден
        apiService.setToken(null);
        localStorage.removeItem('admin_data');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      apiService.setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    
    try {
      const result = await apiService.login(email, password);
      
      if (result.success) {
        setAdmin(result.admin);
        setIsAuthenticated(true);
        localStorage.setItem('admin_data', JSON.stringify(result.admin));
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: 'Ошибка входа в систему' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    
    try {
      const result = await apiService.register(userData);
      
      if (result.success) {
        return { success: true, admin: result.admin };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: 'Ошибка регистрации' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    apiService.logout();
    setAdmin(null);
    setIsAuthenticated(false);
    localStorage.removeItem('admin_data');
  };

  const updateAdmin = async (adminId, userData) => {
    try {
      const result = await apiService.updateAdmin(adminId, userData);
      
      if (result.success) {
        // Если обновляем текущего админа
        if (adminId === admin?.id) {
          setAdmin(result.admin);
          localStorage.setItem('admin_data', JSON.stringify(result.admin));
        }
        return { success: true, admin: result.admin };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: 'Ошибка обновления данных' };
    }
  };

  const value = {
    admin,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateAdmin,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return {token: apiService.getToken(), ...context};
};