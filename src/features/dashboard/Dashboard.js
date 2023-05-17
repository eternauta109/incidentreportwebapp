import { useMemo, useState } from "react";

import { setUser } from "../../services/reportsServices";
import {
  Container,
  Button,
  Grid,
  FormControl,
  FormControlLabel,
  MenuItem,
  TextField,
  Box,
  Switch,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { cinemaList } from "../../config/structure";

const Dashboard = () => {
  const theme = useTheme();

  const [allCinema, setAllCinema] = useState(false);
  const [idDoc, setIdDoc] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    surname: "",
    email: "",
    is_facility: false,
    is_areaManager: false,
    cinema: [],
  });
  useMemo(() => {
    console.log("new user", newUser);
  }, [newUser]);

  const onSubmitNewUser = (e) => {
    e.preventDefault();
    console.log("onSubmitNewUser");
    setUser({ newUser, idDoc });
  };

  const selectAllCinemaHandler = (e) => {
    console.log(e.target.checked);
    setAllCinema((p) => !p);
    if (!allCinema) {
      setNewUser((p) => ({ ...p, cinema: cinemaList.map((c) => c.name) }));
    } else {
      setNewUser((p) => ({ ...p, cinema: [] }));
    }
  };

  return (
    <Container sx={theme.formStyle}>
      <Box component="form" onSubmit={onSubmitNewUser}>
        <Typography variant="body1" color="initial">
          Set new user
        </Typography>
        <Grid container sx={{ mb: 2 }} rowSpacing={4} columnSpacing={1}>
          <Grid item xs={4} sm={2}>
            <TextField
              //name
              onChange={(e) => {
                setNewUser((prev) => ({ ...prev, name: e.target.value }));
              }}
              helperText="name"
              name="name"
              label="name"
            />
          </Grid>

          <Grid item xs={4} sm={2}>
            <TextField
              //surname
              onChange={(e) => {
                setNewUser((prev) => ({ ...prev, surname: e.target.value }));
              }}
              helperText="surname"
              name="surname"
              label="surname "
            />
          </Grid>
          <Grid item xs={4} sm={2}>
            <TextField
              //email
              onChange={(e) => {
                setNewUser((prev) => ({ ...prev, email: e.target.value }));
              }}
              helperText="email"
              name="email"
              label="email "
            />
          </Grid>

          <Grid item xs={4} sm={2}>
            <TextField
              //email
              onChange={(e) => {
                setIdDoc(e.target.value);
              }}
              helperText="idDoc"
              name="idDoc"
              label="idDoc "
            />
          </Grid>

          <Grid item xs={4} sm={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={newUser.is_facility}
                  onChange={(e) => {
                    setNewUser((prev) => ({
                      ...prev,
                      is_facility: e.target.checked,
                    }));
                  }}
                  name="is_facility"
                />
              }
              label="is facility?"
            />
          </Grid>
          <Grid item xs={4} sm={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={newUser.is_areaManager}
                  onChange={(e) => {
                    setNewUser((prev) => ({
                      ...prev,
                      is_areaManager: e.target.checked,
                    }));
                  }}
                  name="is_areaManager"
                />
              }
              label="is areaManager?"
            />
          </Grid>
          <Grid item xs={4} sm={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={allCinema}
                  onChange={(e) => {
                    selectAllCinemaHandler(e);
                  }}
                  name="set_allCinema"
                />
              }
              label="AllCinemas?"
            />
          </Grid>

          <Grid item xs={4} sm={2}>
            <FormControl sx={{ width: "110px" }}>
              <InputLabel sx={{ color: "red", fontWeight: "bold" }}>
                Cinema
              </InputLabel>
              <Select
                multiple
                disabled={allCinema ? true : false}
                value={newUser.cinema}
                label="Cinema"
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    cinema: e.target.value,
                  }))
                }
              >
                {cinemaList.map((el, key) => (
                  <MenuItem key={key} value={el}>
                    {el.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button variant="text" color="primary" type="submit">
          {" "}
          save
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
