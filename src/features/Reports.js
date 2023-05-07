import { useState, useEffect, useMemo } from "react";
/* import ConfirmNewReport from "./ComfirmNewReport"; */
import { db, auth } from "../config/firebase";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ReportsServices from "../services/reportsServices";
import {
  addReport,
  updateReport,
  getRefNum,
} from "../services/reportsServices";
import { Button, Grid, Box, Container, Typography } from "@mui/material";
import { cinemaList } from "../config/structure";
import DateSection from "./reportsSections/DateSections";
import DataCinema from "./reportsSections/DataCinema";
import IssueDescription from "./reportsSections/IssueDescription";
import RefoundsDeal from "./reportsSections/RefoundsDeal";
import CloseSection from "./reportsSections/CloseSection";
import { setNewCinema } from "../store/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail } from "./SendMail";
import { addReportRedux, updateReportRedux } from "../store/slice/reportsSlice";

import dayjs from "dayjs";

import "dayjs/locale/it";

dayjs.locale("it");

export default function Report() {
  const { state } = useLocation();
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const reports = useSelector((state) => state.reports);
  const dispatch = useDispatch();
  /* console.log(user); */

  const initState = {
    startDate: dayjs().format("DD/MM/YYYY"),
    datePrediction: dayjs().format("DD/MM/YYYY"),
    resolved: false,
    endDate: null,
    cinema: user.cinema[0],
    screens_number: user.cinemaDet.screens,
    seats_number: user.cinemaDet.seats,
    area: user.cinemaDet.area,
    screen_with_issue:
      user.cinemaDet.screens_det[user.cinemaDet.screens_det.length - 1].screen,
    screen_with_issue_capacity:
      user.cinemaDet.screens_det[user.cinemaDet.screens_det.length - 1].seats,
    comps: 0,
    category: "altro",
    screen_state: "open",
    refounds: 0,
    show_stopped: 0,
    ref_num: "",
    issue: "",
    note: "",
  };
  const [report, setReport] = useState(initState);
  const [stDate, setStDate] = useState();
  const [datePred, setDatePred] = useState();
  const [endDate, setEndDate] = useState();
  const [update, setUpdate] = useState(false);

  const navigate = useNavigate();

  const handleChangeStDate = (newDate) => {
    setReport({ ...report, startDate: dayjs(newDate).format("DD/MM/YYYY") });
    setStDate(newDate);
  };
  const handleChangeDatePrediction = (newDate) => {
    setReport({
      ...report,
      datePrediction: dayjs(newDate).format("DD/MM/YYYY"),
    });
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
    if (
      e.target.name === "show_stopped" ||
      e.target.name === "refounds" ||
      e.target.name === "comps"
    ) {
      setReport({
        ...report,
        [e.target.name]: +e.target.value,
      });
    } else if (e.target.name === "cinema") {
      let cinemaAreaChange = cinemaList.find(
        (el) => el.name === e.target.value
      );

      setReport({
        ...report,
        area: cinemaAreaChange.area,
        [e.target.name]: e.target.value,
      });
    } else {
      setReport({
        ...report,
        [e.target.name]: e.target.value,
      });
    }
  };

  //registra o aggiorna il report
  const onSubmitReport = (e) => {
    e.preventDefault();
    /* sendEmail(update, report, user); */

    if (state) {
      if (reports.length > 0) {
        dispatch(
          updateReportRedux({ reportId: report.idCoc, updates: report })
        );
      }
      updateReport(state.idDoc, report).then(navigate("../landing"));
    } else {
      if (reports.length > 0) {
        dispatch(addReportRedux({ report }));
      }
      addReport(report).then(navigate("../landing"));
    }
  };

  useEffect(() => {
    let cinemaFind = cinemaList.find((el) => el.name === report.cinema);
    dispatch(setNewCinema({ cinemaFind }));
  }, [report.cinema]);

  useMemo(() => {
    console.log("report in use memo", report);
  }, [report]);

  useEffect(() => {
    getRefNum(report.cinema).then((r) => {
      setReport((prevReport) => ({
        ...prevReport,
        screen_with_issue: state
          ? state.screen_with_issue
          : user.cinemaDet.screens_det[user.cinemaDet.screens_det.length - 1]
              .screen,
        screen_with_issue_capacity: state
          ? state.screen_with_issue_capacity
          : user.cinemaDet.screens_det[user.cinemaDet.screens_det.length - 1]
              .seats,
        screens_number: state ? state.screens_number : user.cinemaDet.screens,
        seats_number: state ? state.seats_number : user.cinemaDet.seats,
        ref_num: state
          ? state.ref_num
          : `${r + 1}/${dayjs(report.startDate, "DD/MM/YYYY").format("YYYY")}`,
      }));
    });
  }, [user]);

  useEffect(() => {
    if (state) {
      setUpdate(true);
      /*  console.log(update);
      console.log("state", state); */
      setReport({
        ...state,
      });
    } else {
      getRefNum(report.cinema).then((r) => {
        setReport({
          ...report,
          ref_num: `${r + 1}/${dayjs(report.startDate, "DD/MM/YYYY").format(
            "YYYY"
          )}`,
        });
      });
    }
    return () => setReport(initState);
  }, [state]);

  return (
    <Container sx={theme.formStyle}>
      <Box sx={{ bgcolor: "#f4a261", m: 2, p: 1, borderRadius: 5 }}>
        <Typography variant="h3" color="#264653">
          incident report
        </Typography>
      </Box>

      <Box component="form" onSubmit={onSubmitReport}>
        {/* FRIST SECTION*/}
        <Typography variant="h6" color="secondary" sx={{ mb: "20px" }}>
          date and cinema data
        </Typography>
        <DateSection
          update={update}
          report={report}
          user={user}
          handleChangeDatePrediction={handleChangeDatePrediction}
          handleChangeStDate={handleChangeStDate}
          handleChangeEndDate={handleChangeEndDate}
          setReport={setReport}
        />
        <DataCinema
          user={user}
          report={report}
          reportChange={reportChange}
          setReport={setReport}
        />
        {/* END FRIST SECTION*/}

        {/* SECOND SECTION*/}
        <Typography variant="h6" color="secondary" sx={{ mb: "20px" }}>
          issue description
        </Typography>
        <IssueDescription
          user={user}
          setReport={setReport}
          report={report}
          reportChange={reportChange}
        />
        {/* EDN SECOND SECTION*/}

        {/* THIRD SECTION*/}
        <Typography variant="h6" color="secondary" sx={{ mb: "20px" }}>
          Refound
        </Typography>
        <RefoundsDeal
          user={user}
          report={report}
          reportChange={reportChange}
          setReport={setReport}
        />
        {/* END THIRD SECTION*/}

        {/* FOURTH SECTION*/}
        <Typography variant="h6" color="secondary" sx={{ mb: "20px" }}>
          Close report
        </Typography>
        <CloseSection
          user={user}
          report={report}
          reportChange={reportChange}
          setReport={setReport}
        />
        {/* END FOURTH SECTION*/}
        <Grid container justifyContent="center">
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ width: "300px", mt: 4, mb: 2 }}
          >
            {state ? "UpDate" : "Save"}
          </Button>
        </Grid>
      </Box>
    </Container>
  );
}
