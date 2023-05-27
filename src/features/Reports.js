import { useState, useEffect, useMemo } from "react";
/* import ConfirmNewReport from "./ComfirmNewReport"; */
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  addReport,
  updateReport,
  getRefNum,
} from "../services/reportsServices";
import {
  Button,
  Grid,
  Box,
  Container,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { cinemaList } from "../config/structure";
import DateSection from "./reportsSections/DateSections";
import DataCinema from "./reportsSections/DataCinema";
import IssueDescription from "./reportsSections/IssueDescription";
import RefoundsDeal from "./reportsSections/RefoundsDeal";
import CloseSection from "./reportsSections/CloseSection";
import { sendEmail } from "./SendMail";
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
  setIdDoc,
} from "../store/slice/reportSlice";
import dayjs from "dayjs";
import "dayjs/locale/it";
import { setNewCinema } from "../store/slice/userSlice";

dayjs.locale("it");

export default function Report() {
  const [checkedForEmail, setCheckedForEmail] = useState(true);
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

    checkedForEmail
      ? sendEmail(update, report, user)
      : console.log("mail non inviata");

    if (state) {
      //se arrivo da views con un report da aggiornare
      // e se già esiste reports in redux lo aggiungo

      reports.length > 0 &&
        dispatch(
          updateReportRedux({ reportId: report.idDoc, updates: report })
        );
      //altrimenti aggiorno il report su db
      //al primo caricamento di Views redux si caricherà con
      //tutti i report. Navigo in landing con un messaggio di successo
      updateReport(state.idDoc, report)
        .then(() => navigate("../landing", { state: { succes: true } }))
        .catch((error) => {
          console.log("error in onSubmitReport redux exist", error);
          return navigate("../landing", { state: { succes: false } });
        });
    } else {
      //altriemnti aggiungo il report al db
      //quindi prendo res=>idDoc a aggiorno il report.
      //se esiste gia reports lo aggiungo se no niente, aggiorno solo
      //idDoc di report
      addReport(report)
        .then((res) => {
          console.log("res in add report with no reports", res);
          const updatedReport = { ...report, idDoc: res }; // Aggiungi l'ID al nuovo report
          reports.length > 0 &&
            dispatch(addReportRedux({ report: updatedReport })); // Aggiungi il nuovo report con l'ID alla slice reports

          dispatch(setIdDoc(res)); // Aggiorna l'ID nella slice report
        })
        .then(() => navigate("../landing", { state: { succes: true } }))
        .catch((error) => {
          console.log("error in onSubmitReport if redux do not exist", error);
          return navigate("../landing", { state: { succes: false } });
        });
    }
  };

  /*   useMemo(() => {
    console.log("report in use memo", report);
  }, [report]); */

  //inizializzo lo slice report
  const initializeReport = () => {
    const cinemaFind = cinemaList.find((el) => el.name === user.cinema[0]);

    getRefNum(user.cinema[0]).then((r) => {
      dispatch(setCinema(cinemaFind.name));
      let appo = `${r + 1}/${dayjs().format("YYYY")}`;

      dispatch(setRef_num(`${r + 1}/${dayjs().format("YYYY")}`));
    });

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

    setLoading(false);
  };

  useEffect(() => {
    console.log("stae in Report useEffect", state);
    if (state) {
      setUpdate(true);
      dispatch(setAllReport(state));
      setLoading(false);
      //prima aggiorno il dettaglio cinema nell'user
      const cinemaFind = cinemaList.find((el) => el.name === state.cinema);
      console.log("cinemafind0!!!!", cinemaFind);
      dispatch(setNewCinema({ cinemaFind }));
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
              {update ? "update " : "new "}incident report
            </Typography>
          </Box>

          <Box component="form" onSubmit={onSubmitReport}>
            {/* FRIST SECTION*/}
            <Typography variant="h6" color="secondary" sx={{ mb: "20px" }}>
              date and cinema data
            </Typography>
            <DateSection update={update} report={report} user={user} />
            <DataCinema
              user={user}
              report={report}
              cinemaList={cinemaList}
              update={update}
            />

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
              <FormControlLabel
                sx={{ ml: "25px" }}
                control={
                  <Checkbox
                    checked={checkedForEmail}
                    onChange={() => setCheckedForEmail(!checkedForEmail)}
                  />
                }
                label={
                  checkedForEmail
                    ? "send email (default option). The app will save report and send mail "
                    : " DON'T send email. The app will save the report without send email"
                }
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ width: "300px", mt: 4, mb: 2 }}
              >
                {update ? "UpDate reports" : "Save reports"}
              </Button>
            </Grid>
          </Box>
        </>
      )}
    </Container>
  );
}
