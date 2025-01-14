import { useContext } from "react";
import { AlertContext } from "../contexts/GlobalContext";

function AppAlert() {
  const { alert } = useContext(AlertContext);

  if (!alert) return null;

  return (
    <div className="alert alert-danger position-fixed top-0 start-50 translate-middle-x mt-3">
      {alert}
    </div>
  );
}

export default AppAlert;
