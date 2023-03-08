import { useState, useEffect, useMemo } from "react";
/* import ConfirmNewReport from "./ComfirmNewReport"; */
import { useNavigate, useLocation, Link } from "react-router-dom";
import ReportsServices from "../services/reportsServices";
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
import { useSelector } from "react-redux";
import { cinemaList, categoryList } from "../config/structure";

import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/it";

dayjs.locale("it");

export default function Report() {
  const { state } = useLocation();
  const user = useSelector((state) => state.user);
  const initState = {
    startDate: dayjs().format("DD/MM/YYYY"),
    resolved: false,
    endDate: null,
    cinema: user.is_facility ? "insert cinema" : user.cinema.name,
    screens_number: user.is_facility
      ? "insert screen number"
      : user.cinema.screens_number,
    seats_number: user.is_facility
      ? "insert total seats"
      : user.cinema.seats_number,
    screen_with_issues: "",
    seats_numeber_closed_screen: "",
    comps: 0,
    category: "altro",
    screen_state: "open",
    refounds: 0,
    show_stopped: 0,
    issue: "",
    note: "",
  };
  const [report, setReport] = useState(initState);
  const [stDate, setStDate] = useState();
  const [endDate, setEndDate] = useState();

  const navigate = useNavigate();

  const handleChangeStDate = (newDate) => {
    setReport({ ...report, startDate: dayjs(newDate).format("DD/MM/YYYY") });
    setStDate(newDate);
  };

  const handleChangeEndDate = (newDate) => {
    let edDate = null;
    if (report.resolved) {
      edDate = dayjs(endDate).format("DD/MM/YYYY");
    }
    setReport({ ...report, endDate: edDate });
    console.log(newDate);
    setEndDate(newDate);
  };

  const reportChange = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value,
    });
  };

  //registra o aggiorna il report
  const onSubmitReport = async (e) => {
    e.preventDefault();

    if (state) {
      try {
        await ReportsServices.updateReport(report.docId, report).then(
          navigate("../landing")
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await ReportsServices.addReport(report).then(navigate("../landing"));
      } catch (err) {
        console.log(err);
      }
    }
  };

  useMemo(() => {
    console.log("report in use memo", report);
  }, [report]);

  useEffect(() => {
    if (state) {
      console.log("state", state);
      setReport({
        ...state,
      });
    }

    return () => setReport(initState);
  }, []);

  return (
    <Container
      sx={{
        borderRadius: 5,
        bgcolor: "#f9fbe7",
        opacity: 0.95,
        width: "100%",

        minHeight: 900,
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 1,
      }}
    >
      <Typography component="h1" variant="h5" color="primary">
        report form
      </Typography>

      <Box component="form" onSubmit={onSubmitReport}>
        <Grid container sx={{ mb: 2, mt: 2 }} rowSpacing={4} columnSpacing={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item xs={12} sm={6}>
              <MobileDatePicker
                label="Start report"
                format="DD/MM/YYYY"
                value={report ? dayjs(report.startDate, "DD/MM/YYYY") : stDate}
                onChange={handleChangeStDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>

            {/* //RESOLVED */}
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                label={report.resolved ? "Resolved" : "not resolved"}
                control={
                  <Checkbox
                    value={report?.resolved ? report.resolved : false}
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
                    report.endDate
                      ? dayjs(report.endDate, "DD/MM/YYYY")
                      : dayjs()
                  }
                  onChange={handleChangeEndDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            )}
          </LocalizationProvider>
          {/* //ANAGRAFICA CINEMA */}

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

        {/* //..ISSUES  */}

        <Grid container sx={{ mb: 2, mt: 2 }} rowSpacing={4} columnSpacing={1}>
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
              <InputLabel id="demo-simple-select-label">
                Screen State
              </InputLabel>
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

          {/*  LINE REFOUNDS AND SHOW SOPPRIMED */}

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

          {/* LINE  issues line*/}
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

          {/* LINE days work */}

          <Grid item xs={6} sm={6}>
            <TextField
              helperText="work days"
              id="days_work"
              label=""
              disabled
              value={dayjs().diff(dayjs(report.startDate, "DD/MM/YYYY"), "day")}
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

          <Grid item xs={12} sm={12}>
            <Button type="submit" variant="contained" sx={{ mt: 4 }}>
              {state ? "UpDate" : "Register"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
