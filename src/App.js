import "./styles.css";
import { useEffect } from "react";
import Login from "./features/Login";
import Landing from "./features/Landing";
import Reports from "./features/Reports";
import Views from "./features/Views";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { auth } from "./config/firebase.js";
import CssBaseline from "@mui/material/CssBaseline";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./features/Navbar";
import ProtectedRoute from "./services/ProtectedRoute";
import Dashboard from "./features/dashboard/Dashboard";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "rgba(159, 39, 176)",
    },
    formColor: {
      main: "rgba(255, 152, 0,0.2)",
    },
  },
  containerStyle: {
    borderRadius: 5,
    width: "100%",
    minHeight: "100vh",
    backgroundSize: "cover",
    /* backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: `url(${image})`, */
    /* opacity: 0.5, */
    backgroundColor: "rgb(230, 230, 230,0.3)",
  },

  formStyle: {
    width: "100%",
    margin: "0 auto",
    mt: "80px",
    backgroundColor: "rgba(255, 152, 0,0.2)", //rgba(249, 251, 231, 0.8)
    opacity: 0.8,
    borderRadius: "5px",
    minHeight: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paperContainer: {},

  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export default function App() {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Container style={theme.containerStyle} maxWidth={false} sx={{ p: 2 }}>
        <CssBaseline />
        {user && <Navbar />}

        <Routes>
          <Route
            path="landing"
            element={
              <ProtectedRoute>
                <Landing />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="views"
            element={
              <ProtectedRoute>
                <Views />
              </ProtectedRoute>
            }
          />
          <Route
            path="dash"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Login />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}
