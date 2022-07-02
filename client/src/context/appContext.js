import React, { useReducer, useContext } from 'react';

import reducer from './reducer';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from './actions';

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
  token: null,
  userLocation: '',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const registerUser = async (currentUser) => {
    console.log(currentUser);
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easier access to the AppContext from components that needs it. (do not need to import useContext and AppContext in every component)
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
