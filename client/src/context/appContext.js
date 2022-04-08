import React, { useReducer, useContext } from 'react';

import reducer from './reducer';
import { DISPLAY_ALERT } from './actions';

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easier access to the AppContext from components that needs it. (do not need to import useContext and AppContext in every component)
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };