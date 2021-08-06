import { createContext, useContext, useReducer } from "react";

const AlertContext = createContext();

const AlertType = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  CLOSE: "close",
};

const initial = {
  state: false,
  options: { type: "", message: "" },
};

const alertReducer = (alert, action) => {
  switch (action.type) {
    case "success": {
      return {
        state: true,
        options: { type: "success", message: action.payload.message },
      };
    }
    case "error": {
      return {
        state: true,
        options: { type: "error", message: action.payload.message },
      };
    }
    case "info": {
      return {
        state: true,
        options: { type: "info", message: action.payload.message },
      };
    }
    case "close": {
      return { ...alert, state: false };
    }
    default: {
      throw new Error(`Action Type Error`);
    }
  }
};

const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, initial);
  const value = { state, dispatch };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};

const useAlert = () => {
  const alertContext = useContext(AlertContext);

  if (alertContext === undefined) {
    throw new Error("useAlert must be use in alertProvider");
  }

  return alertContext;
};

export { AlertProvider, useAlert, AlertType };
