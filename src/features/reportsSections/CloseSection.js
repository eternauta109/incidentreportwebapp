import React from "react";
import { useDispatch } from "react-redux";
import { TextField, Grid } from "@mui/material";

import dayjs from "dayjs";
import "dayjs/locale/it";
import {
  setNote,
  setRedattore,
  setWorkDays,
} from "../../store/slice/reportSlice";

dayjs.locale("it");

const CloseSection = ({ report }) => {
  const dispatch = useDispatch();

  /*  useEffect(() => {
    const 
  }, [report.startDate, report.endDate]); */

  return (
    <>
      <Grid container sx={{ mb: 2 }} rowSpacing={4} columnSpacing={1}>
        <Grid item xs={6} sm={6}>
          <TextField
            helperText="work days"
            id="days_work"
            label=""
            disabled
            onChange={(e) => dispatch(setWorkDays(e.target.value))}
            value={
              report.workDays
                ? report.workDays
                : dayjs().diff(dayjs(report.startDate, "DD/MM/YYYY"), "day")
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            helperText="resolution day"
            value={report?.endDate ? report.endDate : "in progress"}
            label="resolution day"
            fullWidth
          />
        </Grid>

        {/* LINE */}
        <Grid item xs={12} sm={12}>
          <TextField
            helperText="Please enter some note"
            id="note"
            name="note"
            label="Note"
            onChange={(e) => dispatch(setNote(e.target.value))}
            value={report.note ? report.note : ""}
            multiline
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            helperText="your name"
            id="redattore"
            name="redattore"
            label="enter your name"
            onChange={(e) => dispatch(setRedattore(e.target.value))}
            value={report.redattore ? report.redattore : ""}
            multiline
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CloseSection;
