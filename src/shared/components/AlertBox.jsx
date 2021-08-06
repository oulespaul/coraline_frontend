import { useEffect } from "react";
import { AlertType, useAlert } from "shared/context/alertContext";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const AlertMassage = () => {
  const { state, dispatch } = useAlert();

  useEffect(() => {
    const autoHide = setTimeout(() => {
      handleClose();
    }, 2000);
    return () => clearTimeout(autoHide);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.state]);

  function handleClose() {
    dispatch({ type: AlertType.CLOSE });
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={state.state}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={state.options.type}>
          {state.options.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AlertMassage;
