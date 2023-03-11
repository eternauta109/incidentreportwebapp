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

const RefoundsDeal = ({ report, reportChange, user, setReport }) => {
  return (
    <>
      <Grid container sx={{ mb: 2 }} rowSpacing={4} columnSpacing={1}>
        <Grid item xs={4} sm={4}>
          <TextField
            helperText="insert number show suppressed"
            name="show_stopped"
            label="show suppressed"
            onFocus={(event) => {
              event.target.select();
            }}
            onChange={(e) => reportChange(e)}
            value={report ? report.show_stopped : ""}
            fullWidth
          />
        </Grid>
        <Grid item xs={4} sm={4}>
          <TextField
            helperText="insert refounds cost"
            name="refounds"
            label="ref. cost"
            onFocus={(event) => {
              event.target.select();
            }}
            onChange={(e) => reportChange(e)}
            value={report ? report.refounds : ""}
            fullWidth
          />{" "}
        </Grid>
        <Grid item xs={4} sm={4}>
          <TextField
            InputLabelProps={{ shrink: true }}
            helperText="insert complimentary"
            name="comps"
            label="comps"
            onFocus={(event) => {
              event.target.select();
            }}
            onChange={(e) => reportChange(e)}
            value={report ? report.comps : ""}
            fullWidth
          />{" "}
        </Grid>
      </Grid>
    </>
  );
};

export default RefoundsDeal;
