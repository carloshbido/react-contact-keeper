import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';
import { array } from 'prop-types';

const AuthState = props => {

  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  }

const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = () => {
    console.log('loaduser')
  }

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {  
      const res = await axios.post('/api/user', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg
      });
    }
  
  }

  // Login User
  const login = () => {
    console.log('login')
  }

  // Logout
  const logout = () => {
    console.log('logout')
  }

  //Clear Errors
  const clearErrors = () => {
    console.log('login')
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors
      }}>
      { props.children }
    </AuthContext.Provider>
  );
};

export default AuthState;
