import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Box, Stack, Typography, Button } from "@mui/material";

import { useTheme } from "@mui/material/styles";

export default function Landing() {
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  window.scrollTo(0, 0);

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
        <Button variant="contained" onClick={() => navigate("/reports")}>
          Add Report
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate("/views", { state: { user: { ...user } } })}
        >
          View/Modify Report
        </Button>

        {/*  <Item elevation={9}>Charts analisys</Item> */}
      </Stack>
    </Container>
  );
}
