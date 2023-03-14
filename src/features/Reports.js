import { useState, useEffect, useMemo } from "react";
/* import ConfirmNewReport from "./ComfirmNewReport"; */
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
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
import DateSection from "./reportsSections/DateSections";
import DataCinema from "./reportsSections/DataCinema";
import IssueDescription from "./reportsSections/IssueDescription";
import RefoundsDeal from "./reportsSections/RefoundsDeal";
import CloseSection from "./reportsSections/CloseSection";

import dayjs from "dayjs";

import "dayjs/locale/it";

dayjs.locale("it");

export default function Report() {
  const { state } = useLocation();
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const cinema = cinemaList.find((e) => e.name === user.cinema.name);
  console.log(cinema.screens_det);
  console.log(cinema);
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
    screen_with_issue: cinema.screens_det[cinema.screens_det.length - 1].screen,
    screen_with_issue_capacity:
      cinema.screens_det[cinema.screens_det.length - 1].seats,
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
    <Container sx={theme.formStyle}>
      <Typography variant="h3" color="primary" sx={{ mb: "50px" }}>
        report form
      </Typography>

      <Box component="form" onSubmit={onSubmitReport}>
        {/* FRIST SECTION*/}
        <Typography variant="h6" color="secondary" sx={{ mb: "20px" }}>
          date and cinema data
        </Typography>
        <DateSection
          report={report}
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
          cinema={cinema}
          reportChange={reportChange}
          setReport={setReport}
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

        <Grid item xs={12} sm={12}>
          <Button type="submit" variant="contained" sx={{ mt: 4, mb: 2 }}>
            {state ? "UpDate" : "Register"}
          </Button>
        </Grid>
      </Box>
    </Container>
  );
}
