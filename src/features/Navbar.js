import * as React from "react";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import ReportsServices from "../services/reportsServices";
import { userLogOut } from "../store/slice/userSlice";

const drawerWidth = 240;

export default function Navbar(props) {
  const { window } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const user = useSelector((state) => state.user);

  const logOutEventClick = async () => {
    dispatch(userLogOut());
    await ReportsServices.logOut();
    navigate("/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  //Toggle menu
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", p: 2 }}>
      <Typography variant="h6" sx={{ my: 2, color: "orange" }}>
        menu
      </Typography>
      <Divider />
      <Stack>
        <Button
          color="secondary"
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
          sx={{ color: "#fff", mb: "4px" }}
        >
          LogOut
        </Button>
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
        sx={{ bgcolor: "yellow", margin: " 0 auto " }}
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
