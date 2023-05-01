import { useEffect, useState } from "react";

import { TextField, Checkbox, Grid, FormControlLabel } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/it";
dayjs.locale("it");

const DateSection = ({
  report,
  user,
  update,
  handleChangeStDate,
  handleChangeEndDate,
  handleChangeDatePrediction,
  setReport,
}) => {
  return (
    <Grid container sx={{ mb: 2 }} columnSpacing={5} rowSpacing={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid item xs={12} sm={4}>
          <MobileDatePicker
            label="Start report"
            format="DD/MM/YYYY"
            value={report ? dayjs(report.startDate, "DD/MM/YYYY") : stDate}
            onChange={handleChangeStDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MobileDatePicker
            label="res. prediction"
            format="DD/MM/YYYY"
            value={
              report
                ? dayjs(report.datePrediction, "DD/MM/YYYY")
                : datePrediction
            }
            onChange={handleChangeDatePrediction}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            value={report.ref_num}
            name="ref_num"
            disabled={user.is_facility ? false : true}
            label="ref.number"
            fullWidth
          />
        </Grid>

        {/* //RESOLVED */}
        <Grid item xs={12} sm={12}>
          <FormControlLabel
            label={report.resolved ? "Resolved" : "not resolved"}
            control={
              <Checkbox
                value={report.resolved}
                checked={report.resolved}
                onChange={() => {
                  if (!report.resolved) {
                    setReport({
                      ...report,
                      resolved: !report.resolved,
                      endDate: dayjs().format("DD/MM/YYYY"),
                    });
                  } else {
                    setReport({
                      ...report,
                      resolved: !report.resolved,
                      endDate: null,
                    });
                  }
                }}
              />
            }
          />
        </Grid>

        {report.resolved && (
          <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
            <MobileDatePicker
              label="End report"
              format="DD/MM/YYYY"
              value={
                report.endDate ? dayjs(report.endDate, "DD/MM/YYYY") : dayjs()
              }
              onChange={handleChangeEndDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
        )}
      </LocalizationProvider>
    </Grid>
  );
};

export default DateSection;
