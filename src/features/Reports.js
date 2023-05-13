import { useState, useEffect, useMemo, useReducer } from "react";
/* import ConfirmNewReport from "./ComfirmNewReport"; */
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
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

import { useDispatch, useSelector } from "react-redux";
import { addReportRedux, updateReportRedux } from "../store/slice/reportsSlice";
import {
  setAllReport,
  setCinema,
  setScreens_number,
  setSeats_number,
  setArea,
  setScreen_with_issue,
  setScreen_with_issue_capacity,
  setRef_num,
  resetReport,
} from "../store/slice/reportSlice";
import dayjs from "dayjs";
import "dayjs/locale/it";

dayjs.locale("it");

export default function Report() {
  const { state } = useLocation();
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const reports = useSelector((state) => state.reports);
  const report = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  const navigate = useNavigate();

  //registra o aggiorna il report
  const onSubmitReport = (e) => {
    e.preventDefault();
    /* sendEmail(update, report, user); */

    if (state) {
      if (reports.length > 0) {
        console.log("qui");
        dispatch(
          updateReportRedux({ reportId: report.idDoc, updates: report })
        ).then(updateReport(state.idDoc, report).then(navigate("../landing")));
      } else {
        updateReport(state.idDoc, report).then(navigate("../landing"));
      }
    } else {
      if (reports.length > 0) {
        dispatch(addReportRedux({ report }));
      }
      addReport(report).then(navigate("../landing"));
    }
  };

  useMemo(() => {
    console.log("report in use memo", report);
  }, [report]);

  //inizializzo lo slice report
  const initializeReport = () => {
    const cinemaFind = cinemaList.find((el) => el.name === user.cinema[0]);
    console.log("initializing cinema find", cinemaFind);

    getRefNum(user.cinema[0]).then((r) => {
      dispatch(setCinema(cinemaFind.name));

      let appo = `${r + 1}/${dayjs().format("YYYY")}`;
      console.log("appo", appo);
      dispatch(setRef_num(`${r + 1}/${dayjs().format("YYYY")}`));

      dispatch(setScreens_number(cinemaFind.screens));
      dispatch(setSeats_number(cinemaFind.seats));
      dispatch(setArea(cinemaFind.area));
      dispatch(
        setScreen_with_issue(
          cinemaFind.screens_det[cinemaFind.screens_det.length - 1].screen
        )
      );
      dispatch(
        setScreen_with_issue_capacity(
          cinemaFind.screens_det[cinemaFind.screens_det.length - 1].seats
        )
      );
    });
    setLoading(false);
  };

  useEffect(() => {
    if (state) {
      console.log(state);
      setUpdate(true);
      dispatch(setAllReport(state));
      setLoading(false);
    } else {
      initializeReport();
    }
    return () => dispatch(resetReport());
  }, [state]);

  return (
    <Container sx={theme.formStyle}>
      {!loading && (
        <>
          <Box
            sx={{
              border: 4,
              borderColor: (theme) => theme.palette.secondary.main,
              m: 2,
              p: 1,
              borderRadius: 5,
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="primary"
              fontWeight="bold"
            >
              incident report
            </Typography>
          </Box>

          <Box component="form" onSubmit={onSubmitReport}>
            {/* FRIST SECTION*/}
            <Typography variant="h6" color="secondary" sx={{ mb: "20px" }}>
              date and cinema data
            </Typography>
            <DateSection update={update} report={report} user={user} />
            <DataCinema user={user} report={report} cinemaList={cinemaList} />

            <Typography variant="h6" color="secondary" sx={{ mb: "20px" }}>
              issue description
            </Typography>
            <IssueDescription user={user} report={report} />

            <Typography variant="h6" color="secondary" sx={{ mb: "20px" }}>
              Refound
            </Typography>
            <RefoundsDeal user={user} report={report} />

            <Typography variant="h6" color="secondary" sx={{ mb: "20px" }}>
              Close report
            </Typography>
            <CloseSection user={user} report={report} />

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
        </>
      )}
    </Container>
  );
}
