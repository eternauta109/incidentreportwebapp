import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

const drawerWidth = 240;

export default function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const user = useSelector((state) => state.user);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  //Toggle menu
  const drawer = (
    <Box
      spacing="2"
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", p: 2 }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        menu
      </Typography>
      <Divider />
      <Stack>
        <Button variant="outlined" sx={{ color: "#fff", mb: "4px" }}>
          <Link to="landing"> Home</Link>
        </Button>

        <Button variant="outlined" sx={{ color: "#fff", mb: "4px" }}>
          <Link to="reports"> insert new report</Link>
        </Button>

        <Button variant="outlined" sx={{ color: "#fff", mb: "4px" }}>
          <Link to="views" state={{ user: { ...user } }}>
            reports list
          </Link>
        </Button>
        <Button variant="outlined" sx={{ color: "#fff", mb: "4px" }}>
          <Link to="views" state={{ user: { ...user } }}>
            LogOut
          </Link>
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
        width: "65px",
        borderRadius: "50%",
        margin: " 0 auto 20px",
      }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ bgcolor: "yellow", margin: " 0 auto ", opacity: "o.9" }}
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
            },
          }}
        >
          {drawer}
        </Drawer>
      </Container>
    </Box>
  );
}
