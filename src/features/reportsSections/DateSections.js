import { useDispatch } from "react-redux";
import {
  setStartDate,
  setDatePrediction,
  setResolved,
  setEndDate,
  setWorkDays,
} from "../../store/slice/reportSlice";

import { TextField, Checkbox, Grid, FormControlLabel } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/it";
dayjs.locale("it");

const DateSection = ({ report }) => {
  const dispatch = useDispatch();

  const handleChangeStDate = (newDate) => {
    dispatch(setStartDate(dayjs(newDate).format("DD/MM/YYYY")));
    if (report.endDate) {
      console.log("qui");
      dispatch(
        setWorkDays(
          dayjs(report.endDate, "DD/MM/YYYY").diff(
            dayjs(newDate, "DD/MM/YYYY"),
            "day"
          )
        )
      );
    } else {
      const today = dayjs();
      const diffinDays = today.diff(newDate, "day");
      dispatch(setWorkDays(diffinDays));
    }
  };
  const handleChangeDatePrediction = (newDate) => {
    dispatch(setDatePrediction(dayjs(newDate).format("DD/MM/YYYY")));
  };
  const handleChangeEndDate = (newDate) => {
    dispatch(setEndDate(dayjs(newDate).format("DD/MM/YYYY")));
    dispatch(
      setWorkDays(
        dayjs(newDate, "DD/MM/YYYY").diff(
          dayjs(report.startDate, "DD/MM/YYYY"),
          "day"
        )
      )
    );
  };

  return (
    <Grid container sx={{ mb: 2 }} columnSpacing={5} rowSpacing={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid item xs={12} sm={4}>
          <MobileDatePicker
            label="Start report"
            format="DD/MM/YYYY"
            value={report ? dayjs(report.startDate, "DD/MM/YYYY") : dayjs()}
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
                : dayjs().format("DD/MM/YYYY")
            }
            onChange={handleChangeDatePrediction}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            value={report.ref_num ? report.ref_num : ""}
            name="ref_num"
            disabled
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
                    dispatch(setResolved(!report.resolved));
                    dispatch(setEndDate(dayjs().format("DD/MM/YYYY")));
                  } else {
                    dispatch(setResolved(!report.resolved));
                    dispatch(setEndDate(null));
                    const today = dayjs();
                    const diffinDays = today.diff(
                      dayjs(report.startDate, "DD/MM/YYYY"),
                      "day"
                    );
                    dispatch(setWorkDays(diffinDays));
                  }
                }}
              />
            }
          />
        </Grid>

        {report.resolved && (
          <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
            <MobileDatePicker
              format="DD/MM/YYYY"
              label="End report"
              value={
                report?.endDate
                  ? dayjs(report.endDate, "DD/MM/YYYY")
                  : dayjs().format("DD/MM/YYYY")
              }
              onChange={handleChangeEndDate}
            />
          </Grid>
        )}
      </LocalizationProvider>
    </Grid>
  );
};

export default DateSection;
