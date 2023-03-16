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
import image from "./assets/cinema_image2.webp";
import Navbar from "./features/Navbar";
import ProtectedRoute from "./services/ProtectedRoute";

const theme = createTheme({
  conatainerStyle: {
    borderRadius: 5,
    width: "100%",

    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: `url(${image})`,
    minHeight: "1000px",
    height: "auto",
  },

  formStyle: {
    width: "100%",
    bgcolor: "rgba(249,251,231,0.8)",
    margin: "0 auto",
    mt: "80px",
    borderRadius: "5px",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  paperContainer: {},
  palette: {
    primary: {
      main: "#ff8f00",
    },
    secondary: {
      main: "#7cb342",
    },
  },
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
      <Container style={theme.conatainerStyle} maxWidth={false} sx={{ p: 2 }}>
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

          <Route path="/" element={<Login />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}
