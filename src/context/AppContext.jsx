import PropTypes from "prop-types";
import { createContext, useReducer } from "react";
import paletas from "../mocks/paletas.json";
import reducerPaletas from "../reducer/reducerPaletas";
export const AppContext = createContext(null);

function AppProvider({ children }) {
  const reducer = reducerPaletas;
  const [state, dispatch] = useReducer(reducer, paletas);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
};

export default AppProvider;
