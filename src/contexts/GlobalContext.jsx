import { createContext, useState } from "react";

// Context Globale
const GlobalContext = createContext();

// Context per gli avvisi
const AlertContext = createContext();

function AlertProvider({ children }) {
  const [alert, setAlert] = useState("");

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => setAlert(""), 3000);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export { GlobalContext, AlertContext, AlertProvider };
