import React from "react";
import { NumericFormat } from "react-number-format";

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

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      prefix="€ "
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      // isNumericString
    />
  );
}

const RefoundsDeal = ({ report, reportChange, user, setReport }) => {
  return (
    <>
      <Grid container sx={{ mb: 2 }} rowSpacing={4} columnSpacing={1}>
        <Grid item xs={4} sm={4}>
          <TextField
            helperText="insert number show suppressed"
            type="number"
            InputLabelProps={{ shrink: true }}
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
            /* onFocus={(event) => {
              event.target.select();
            }} */
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
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
            type="number"
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
