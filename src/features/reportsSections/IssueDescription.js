import React, { useState } from "react";

import {
  Select,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Grid,
} from "@mui/material";
import { categoryList } from "../../config/structure";

const IssueDescription = ({
  report,
  reportChange,
  user,

  setReport,
}) => {
  const onChangeScreensSelect = (e) => {
    let seatsObj = user.cinemaDet.screens_det.find(
      (el) => el.screen === e.target.value
    );
    console.log("obj", seatsObj);
    setReport({
      ...report,
      screen_with_issue: e.target.value,
      screen_with_issue_capacity: seatsObj.seats,
    });
  };
  return (
    <Grid container sx={{ mb: 2 }} rowSpacing={2} columnSpacing={10}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            screen with issue
          </InputLabel>
          <Select
            name="screen_with_issue"
            value={report.screen_with_issue}
            label="Screen with issue"
            onChange={(e) => onChangeScreensSelect(e)}
          >
            {user.cinemaDet.screens_det.map((el, key) => (
              <MenuItem key={key} value={el.screen}>
                {el.screen}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          helperText="seats number of closed screen"
          name="screen_with_issue_capacity"
          label="Seats"
          disabled={user.is_facility ? false : true}
          InputLabelProps={{ shrink: true }}
          value={report.screen_with_issue_capacity}
          fullWidth
        />
      </Grid>

      {/* LINE  category */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
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
  );
};

export default IssueDescription;
