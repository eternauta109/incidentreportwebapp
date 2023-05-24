import * as React from "react";
import Box from "@mui/material/Box";

import favicon from ".././favicon.ico";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Divider,
  Drawer,
  IconButton,
  Container,
  Button,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

import { useDispatch, useSelector } from "react-redux";
import ReportsServices from "../services/reportsServices";
import { userLogOut } from "../store/slice/userSlice";
import { reportsLogOut } from "../store/slice/reportsSlice";

const drawerWidth = 240;

export default function Navbar(props) {
  const { window } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const user = useSelector((state) => state.user);

  const logOutEventClick = async () => {
    navigate("/");
    dispatch(userLogOut());
    dispatch(reportsLogOut());
    await ReportsServices.logOut();
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  //Toggle menu
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", p: 2 }}>
      <Stack direction="row" spacing={4} alignItems="center">
        <img
          src={favicon}
          alt="Favicon"
          style={{ width: "40px", height: "40px" }}
        />
        <Typography variant="h6" sx={{ my: 2, color: "orange" }}>
          menu
        </Typography>
      </Stack>

      <Divider />
      <Stack sx={{ mt: "20px" }}>
        <Button
          color="primary"
          variant="contained"
          sx={{ color: "#fff", mb: "4px" }}
          onClick={() => {
            navigate("/");
          }}
        >
          HOME
        </Button>

        <Button
          color="secondary"
          variant="contained"
          sx={{ color: "#fff", mb: "4px" }}
          onClick={() => {
            navigate("reports");
          }}
        >
          insert new report
        </Button>

        <Button
          color="secondary"
          variant="contained"
          sx={{ color: "#fff", mb: "4px" }}
          onClick={() => {
            navigate("views", { state: { user: { ...user } } });
          }}
        >
          reports list
        </Button>
        <Button
          color="error"
          onClick={(e) => {
            logOutEventClick(e);
          }}
          variant="contained"
          sx={{ color: "#fff", mt: "20px" }}
        >
          LogOut
        </Button>
        {user.admin && (
          <Button
            color="secondary"
            onClick={(e) => {
              navigate("dash");
            }}
            variant="contained"
            sx={{ color: "#fff", mt: "40px" }}
          >
            dashboard
          </Button>
        )}
      </Stack>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        mb: "20px",

        width: "45px",
        borderRadius: "50%",
        margin: " 0 auto 20px",
      }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          bgcolor: (theme) => theme.palette.secondary.main,
          margin: " 0 auto ",
          color: "white",
        }}
      >
        <MenuIcon />
      </IconButton>

      <Container component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "rgba(0,0,0,0.5)",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Container>
    </Box>
  );
}
