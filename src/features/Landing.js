import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Box,
  Stack,
  Typography,
  Button,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import { useTheme } from "@mui/material/styles";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Landing() {
  const { state } = useLocation();
  const [openSB, setOpenSBS] = useState(false);
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  window.scrollTo(0, 0);

  useMemo(() => {
    if (state === undefined) {
      return null;
    }
    if (state?.succes !== undefined) {
      state.succes === true ? setOpenSBS(true) : null;
      // La proprietà 'succes' esiste nell'oggetto 'state'
    } else {
      // La proprietà 'succes' non esiste nell'oggetto 'state'
    }
  }, [state]);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSBS(false);
  };

  return (
    <Container maxWidth="xs" sx={theme.formStyle}>
      <Box sx={{ p: 1, m: 2 }}>
        <Typography align="center" fontWeight="bold">
          Wellcome {user.name}
        </Typography>
      </Box>
      <Stack
        sx={{ mt: 8 }}
        direction={{ xs: "column", sm: "column" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          sx={{ width: "300px" }}
          variant="contained"
          onClick={() => navigate("/reports")}
        >
          Add new Report
        </Button>

        <Button
          sx={{ width: "300px" }}
          variant="contained"
          onClick={() => navigate("/views", { state: { user: { ...user } } })}
        >
          View/Modify Report
        </Button>

        {/*  <Item elevation={9}>Charts analisys</Item> */}
      </Stack>
      <Snackbar
        open={openSB}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="success"
          sx={{ width: "100%" }}
        >
          reports saved and mail sent
        </Alert>
      </Snackbar>
    </Container>
  );
}
