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
import { categoryList } from "../../config/structure";

const IssueDescription = ({ report, reportChange, user, setReport }) => {
  return (
    <>
      <Grid container sx={{ mb: 2 }} rowSpacing={4} columnSpacing={1}>
        <Grid item xs={12} sm={6}>
          <TextField
            helperText="the screen with issue. Ex: 5"
            name="screen_with_issues"
            InputLabelProps={{ shrink: user.screen_number ? true : false }}
            label="Screen"
            onChange={(e) => reportChange(e)}
            value={report ? report.screen_with_issues : ""}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            helperText="seats number of closed screen"
            name="seats_numeber_closed_screen"
            label="Seats"
            onChange={(e) => reportChange(e)}
            InputLabelProps={{ shrink: user.screen_number ? true : false }}
            value={report ? report.seats_numeber_closed_screen : ""}
            fullWidth
          />
        </Grid>

        {/* LINE  category */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="category"
              value={report.category}
              label="Category"
              onChange={(e) => reportChange(e)}
            >
              {categoryList.map((el, key) => (
                <MenuItem key={key} value={el}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Screen State</InputLabel>
            <Select
              name="screen_state"
              value={report.screen_state}
              label="Screen State"
              onChange={(e) => reportChange(e)}
            >
              <MenuItem value={"open"}>open</MenuItem>
              <MenuItem value={"close"}>close</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            helperText="explain the issues type"
            id="issue"
            name="issue"
            label="Issue"
            onChange={(e) => reportChange(e)}
            value={report ? report.issue : ""}
            multiline
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

export default IssueDescription;
