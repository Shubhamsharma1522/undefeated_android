// src/context/authContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {BASE_URL, endPoints} from '../services';
import {useSelector} from 'react-redux';

// Create the context
export const AuthContext = createContext(undefined);

// Define the function to fetch user data
const fetchUserData = async data => {
  const response = await axios.post(
    BASE_URL + endPoints.getUserByAuthToken,
    data,
  );
  return response.data;
};

// Define the AuthProvider component
export const AuthProvider = ({children}) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const user = useSelector(state => state.auth.user);
  // Use useMutation to handle the POST request
  const {
    mutate: getUserAuthData,
    data: userData,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: fetchUserData,
    onSuccess: data => {
      console.log('Data received:', data);
      if (data?.code === 200) {
        setIsUserAuthenticated(data?.data); // Set the isUserAuthenticated to the data received
      }
    },
    onError: error => {
      console.error('Error:', error);
    },
  });
  //check that user is already logged in or not. If loggedin then authenticate the user
  useEffect(() => {
    if (user) getUserAuthData({auth_token: user?.auth_token});
  }, []);
  return (
    <AuthContext.Provider
      value={{
        setIsUserAuthenticated,
        isUserAuthenticated,
        isLoading,
        isError,
        error,
        getUserAuthData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("context",context)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
