import React from "react";

import { TextField, Grid } from "@mui/material";

import dayjs from "dayjs";
import "dayjs/locale/it";
dayjs.locale("it");

const CloseSection = ({ report, reportChange, user, setReport }) => {
  return (
    <>
      <Grid container sx={{ mb: 2 }} rowSpacing={4} columnSpacing={1}>
        <Grid item xs={6} sm={6}>
          <TextField
            helperText="work days"
            id="days_work"
            label=""
            disabled
            value={
              report.endDate
                ? dayjs(report.endDate, "DD/MM/YYYY").diff(
                    dayjs(report.startDate, "DD/MM/YYYY"),
                    "day"
                  )
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
            onChange={(e) => {
              reportChange(e);
            }}
            value={report ? report.note : ""}
            multiline
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CloseSection;
