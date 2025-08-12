import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
    
    // Safety timeout - if loading takes too long, force it to complete
    const timeout = setTimeout(() => {
      console.log('Safety timeout - forcing loading to complete');
      setIsLoading(false);
    }, 5000); // 5 seconds timeout
    
    return () => clearTimeout(timeout);
  }, []);

  const loadUser = async () => {
    try {
      console.log('Loading user from storage...');
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');
      
      console.log('Storage data - token:', !!token, 'userData:', !!userData);
      
      if (token && userData) {
        setUser(JSON.parse(userData));
      }
      // Removed automatic dummy user creation - let the user go through login flow
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      console.log('Setting isLoading to false');
      setIsLoading(false);
    }
  };

  const login = async (token, userData) => {
    try {
      console.log('=== LOGIN PROCESS START ===');
      console.log('Setting token:', token);
      console.log('Setting user data:', userData);
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      console.log('Storage updated, setting user state...');
      
      // Add a small delay to ensure state update is processed
      await new Promise(resolve => setTimeout(resolve, 100));
      
      setUser(userData);
      console.log('User state set, login complete');
      console.log('=== LOGIN PROCESS END ===');
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('=== LOGOUT PROCESS START ===');
      console.log('Current user state:', user);
      console.log('Removing token from storage...');
      await AsyncStorage.removeItem('token');
      console.log('Removing user data from storage...');
      await AsyncStorage.removeItem('user');
      console.log('Storage cleared, setting user to null');
      setUser(null);
      console.log('User state set to null, logout complete');
      console.log('=== LOGOUT PROCESS END ===');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
