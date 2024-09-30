import { Alert, Box } from "@mui/material";
import { useEffect } from "react";

function ErrorAlert({ message, showAlert, setShowAlert }: any) {

  useEffect(() => {
    setTimeout(() => setShowAlert(false), 5000);
  }, [showAlert === true]);

  return (
    <>
      {showAlert &&
        <Box sx={{ mx: 10, mb: 5, position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 'tooltip' }}>
          <Alert severity={"error"}>{message}</Alert>
        </Box >
      }
    </>
  );
}

export default ErrorAlert;