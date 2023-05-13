import React from "react";
import { NumericFormat } from "react-number-format";
import { useDispatch } from "react-redux";
import { TextField, Grid } from "@mui/material";
import {
  setComps,
  setRefounds,
  setShow_stopped,
} from "../../store/slice/reportSlice";

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

const RefoundsDeal = ({ report }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Grid container sx={{ mb: 2 }} rowSpacing={4} columnSpacing={1}>
        <Grid item xs={4} sm={4}>
          <TextField
            helperText="insert number show suppressed"
            type="number"
            name="show_stopped"
            label="show suppressed"
            onFocus={(event) => {
              event.target.select();
            }}
            onChange={(e) => dispatch(setShow_stopped(+e.target.value))}
            value={report ? report.show_stopped : 0}
            fullWidth
          />
        </Grid>

        <Grid item xs={4} sm={4}>
          <TextField
            helperText="insert refounds cost"
            name="refounds"
            label="ref. cost"
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
            onFocus={(event) => {
              event.target.select();
            }}
            onChange={(e) => dispatch(setRefounds(+e.target.value))}
            value={report ? report.refounds : 0}
            fullWidth
          />
        </Grid>
        <Grid item xs={4} sm={4}>
          <TextField
            type="number"
            helperText="insert complimentary"
            name="comps"
            label="comps"
            onFocus={(event) => {
              event.target.select();
            }}
            onChange={(e) => dispatch(setComps(+e.target.value))}
            value={report ? report.comps : 0}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

export default RefoundsDeal;
