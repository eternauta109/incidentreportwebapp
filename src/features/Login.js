import React, { useState, useEffect } from "react";
import favicon from ".././favicon.ico";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/slice/userSlice";
import { useTheme } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Container,
  Typography,
  Box,
  Link,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
/* import Visibility from "@material-ui/icons/Visibility"; */
/* import VisibilityOff from "@material-ui/icons/VisibilityOff"; */

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="white"
      marginBottom="40px"
      borderRadius="5px"
      align="center"
      {...props}
      sx={{ bgcolor: "gray", opacity: 0.9, width: "300px" }}
    >
      {"Dev By  "}
      <Link color="inherit" href="#">
        Fabio Conti
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  /*   const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword); */
  const theme = useTheme();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(getUser({ email, password }));
  };

  useEffect(() => {
    if (user) {
      navigate("/landing");
    }
  }, [dispatch, user]);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          component="h1"
          variant="h3"
          color="secondary"
          fontWeight="bold"
        >
          incident report web app
        </Typography>
      </Box>
      <Container component="main" maxWidth="xs" sx={theme.formStyle}>
        <Box
          sx={{
            mb: "100px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={favicon} alt="Favicon" />
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="primary">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              sx={{ input: { backgroundColor: "white" } }}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              label="email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              sx={{ input: { backgroundColor: "white" } }}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              label="Password"
              type="password" /* {showPassword ? "text" : "password"} */
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
      <Box sx={{ mt: "auto", display: "flex", justifyContent: "center" }}>
        <Copyright />
      </Box>
    </Box>
  );
}
