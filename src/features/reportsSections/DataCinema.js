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
  return (
    <Grid container sx={{ mb: 2 }} rowSpacing={4} columnSpacing={1}>
      <Grid item xs={12} sm={8}>
        <TextField
          value={report.cinema}
          InputLabelProps={{ shrink: user.cinema.name ? true : false }}
          helperText="Please enter cinema name"
          name="cinema"
          onChange={(e) => reportChange(e)}
          disabled={user.is_facility ? false : true}
          label="Cinema"
          fullWidth
        />
      </Grid>
      <Grid item xs={6} sm={2}>
        <TextField
          //SCREENS NUMBER
          InputLabelProps={{
            shrink: user.cinema.screens_number ? true : false,
          }}
          value={report.screens_number}
          helperText="n° screens"
          name="screens_number"
          onChange={(e) => reportChange(e)}
          disabled={user.is_facility ? false : true}
          label="Screens number"
        />
      </Grid>
      <Grid item xs={6} sm={2}>
        <TextField
          //SEATS NUMBER
          InputLabelProps={{
            shrink: user.cinema.seats_number ? true : false,
          }}
          value={report.seats_number}
          helperText="tot seats"
          name="seats_number"
          onChange={(e) => reportChange(e)}
          disabled={user.is_facility ? false : true}
          label="seats number"
        />
      </Grid>
    </Grid>
  );
};

export default DataCinema;
