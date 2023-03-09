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
import { getAuth } from "firebase/auth";
import CssBaseline from "@mui/material/CssBaseline";
import "bootstrap/dist/css/bootstrap.min.css";
import image from "./assets/cinema_image.png";
import Navbar from "./features/Navbar";

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
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("auth in app", auth.currentUser);
    if (!auth.currentUser) {
      navigate("/");
    }
  }, [auth]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container style={theme.conatainerStyle} maxWidth={false} sx={{ p: 2 }}>
        {auth.currentUser && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="landing" element={<Landing />} />
          <Route path="reports" element={<Reports />} />
          <Route path="views" element={<Views />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}
