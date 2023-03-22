import React from "react";

import {
  Select,
  TextField,
  FormControl,
  Button,
  Checkbox,
  MenuItem,
  InputLabel,
  Grid,
  Box,
  Container,
  FormControlLabel,
  Typography,
} from "@mui/material";

const DataCinema = ({ report, reportChange, user }) => {
  const onCinemaChange = (e) => {
    reportChange(e);
    console.log(e.target);
  };

  return (
    <Grid container sx={{ mb: 2 }} rowSpacing={4} columnSpacing={1}>
      <Grid item xs={12} sm={8}>
        <FormControl fullWidth>
          <InputLabel>cinema</InputLabel>
          <Select
            name="cinema"
            disabled={user.is_facility ? false : true}
            value={user.cinemaDet.name}
            label="Screen with issue"
            onChange={(e) => onCinemaChange(e)}
          >
            {user.cinema.map((el, key) => (
              <MenuItem key={key} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6} sm={2}>
        <TextField
          //SCREENS NUMBER
          InputLabelProps={{
            shrink: true,
          }}
          value={report.screens_number}
          helperText="n° screens"
          name="screens_number"
          onChange={(e) => reportChange(e)}
          disabled
          label="Screens number"
        />
      </Grid>
      <Grid item xs={6} sm={2}>
        <TextField
          //SEATS NUMBER
          InputLabelProps={{
            shrink: true,
          }}
          value={report.seats_number}
          helperText="tot seats"
          name="seats_number"
          onChange={(e) => reportChange(e)}
          disabled
          label="seats number"
        />
      </Grid>
    </Grid>
  );
};

export default DataCinema;
