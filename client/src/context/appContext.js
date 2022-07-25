import React, { useReducer, useContext } from 'react';
import axios from 'axios';

import reducer from './reducer';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
} from './actions';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  jobLocation: userLocation || '',
  showSidebar: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Axios are set up with interceptors which are a nice way to handle errors and can be used for handling all components (Stats, AllJobs, AddJob, Profile) and be kept in one place.
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  // request interceptors
  authFetch.interceptors.request.use(
    (config) => {
      // set Authorization header before request is sent
      config.headers.common['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    (error) => {
      return Promise.reject(error);
    }
  );

  // response interceptors
  authFetch.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      return response;
    },
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    (error) => {
      // error response for back end to show on the front end, msg: 'Please provide all values' when on of the fields is empty (i.e. Profile name, last name etc...)
      console.log(error.response);
      // error to show when authorization failed (i.e. bearer token is missing), msg: 'Authentication Invalid'
      if (error.response.status === 401) {
        console.log('AUTH ERROR');
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLS = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
  };

  const removeUserFromLS = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('location');
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post('/api/v1/auth/register', currentUser);
      // console.log(response);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });
      addUserToLS({ user, token, location });
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        // data.msg comes from error-handler.js msg: defaultError.msg
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post('/api/v1/auth/login', currentUser);
      console.log('data: ', data);
      const { user, token, location } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
      });
      addUserToLS({ user, token, location });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        // data.msg comes from error-handler.js msg: defaultError.msg
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLS();
  };

  const updateUser = async (currentUser) => {
    console.log('currentUser', currentUser);

    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      console.log(data);
    } catch (error) {
      // console.log(error.response);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easier access to the AppContext from components that needs it. (do not need to import useContext and AppContext in every component)
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
