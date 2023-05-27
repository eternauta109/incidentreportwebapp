import { useState, useEffect, useMemo } from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import { getAllReports, getCinemaReports } from "../store/slice/reportsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  sortDescDateStartDate,
  sortAscDateStartDate,
} from "../services/sorterArrayData";
import Chart from "./Chart";
import ExcelImport from "./ExcelImport";
import ToExcel from "./ToExcel";
import SecondView from "./SecondView";
import { Tabs, Tab } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/it";
dayjs.locale("it");
import { useLocation } from "react-router-dom";
import TableStructure from "./tableComponent/TableStructure";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const filterInit = {
  sorterStDate: false,
  sorterEndDate: false,
  sorterPredDate: false,
  areaSelect: "all",
  cinemaSelected: [],
  categorySelected: [],
  solvedState: "all",
  screenState: "all",
};

export default function View() {
  const reports = useSelector((state) => state.reports);
  const [valueTab, setValueTab] = useState(0);
  const [listReport, setListReport] = useState([]);
  const [listToView, setListToView] = useState([]);
  const [loadingReport, setLoadingReport] = useState(true);
  const [filter, setFilter] = useState(filterInit);

  const dispatch = useDispatch();
  const { state } = useLocation();
  const { user } = state;

  //carico i report
  const loadReport = () => {
    if (user.is_facility) {
      try {
        dispatch(getAllReports());
      } catch (err) {
        console.log("get all reports for facility errors", err);
        // impostiamo isLoading a false anche in caso di errori
      }
    } else {
      try {
        let cinemaUser = user.cinema[0];
        console.log(cinemaUser);
        dispatch(getCinemaReports({ cinema: cinemaUser })).catch((error) => {
          console.log("get all reports for cinema errors", error);
        });
      } catch (err) {
        console.log("get all reports for cinema errors", err);
      }
    }
  };

  //gestione tabs
  const handleChangeTabs = (event, newValue) => {
    event.preventDefault();
    setValueTab(newValue);
  };

  //filtri comulati
  useMemo(() => {
    console.log("filter change", filter);
    const tempArray = [...listReport]; // Copia temporanea dell'array originale

    // Filtra per i cinema selezionati
    const reportsFilteredByCinema =
      filter.cinemaSelected.length > 0
        ? tempArray.filter((item) =>
            filter.cinemaSelected.includes(item.cinema)
          )
        : tempArray;
    // Filtra per l'area
    const reportsFilteredByArea =
      filter.areaSelect === "all"
        ? reportsFilteredByCinema
        : reportsFilteredByCinema.filter(
            (item) => item.area === filter.areaSelect
          );

    //filtra per categoria
    const reportsFilteredByCategory =
      filter.categorySelected.length > 0
        ? reportsFilteredByArea.filter((item) =>
            filter.categorySelected.includes(item.category)
          )
        : reportsFilteredByArea;

    //filtra per screen screenState
    const filteredByScreenState =
      filter.screenState === "all"
        ? reportsFilteredByCategory
        : reportsFilteredByCategory.filter(
            (item) => item.screen_state === filter.screenState
          );

    //filtra per screen solvedState
    const filteredBySolvedState =
      filter.solvedState === "all"
        ? filteredByScreenState
        : filter.solvedState === "solved"
        ? filteredByScreenState.filter((item) => item.resolved === true)
        : filteredByScreenState.filter((item) => item.resolved === false);

    const sorterStartDate = filter.sorterStDate
      ? filteredBySolvedState.sort(sortAscDateStartDate)
      : filteredBySolvedState.sort(sortDescDateStartDate);

    /* const sorterEndDate = filter.sorterEndDate
      ? (filteredBySolvedState.sort(sortAscDateEndDate), console.log("true"))
      : (filteredBySolvedState.sort(sortDescDateEndDate), console.log("false"));

    const sorterPredDate = filter.sorterPredDate
      ? (filteredBySolvedState.sort(sortDescPredEndDate), console.log("true"))
      : (filteredBySolvedState.sort(sortAscPredEndDate), console.log("false")); */

    setListToView(filteredBySolvedState);
  }, [filter]);

  useMemo(() => {
    setListToView((prev) => [...prev.sort(sortDescDateStartDate)]);
    setListReport((prev) => [...prev.sort(sortDescDateStartDate)]);
  }, [loadingReport]);

  useEffect(() => {
    if (reports.length > 0) {
      return (
        console.log("leggo reports da redux"),
        setListToView([...reports]),
        setListReport([...reports]),
        setLoadingReport(false)
      );
    }
    console.log("leggo reports prima volta da firebase");
    loadReport();
    console.log(reports.length);

    return () => {
      console.log("views unmounted");
      setListReport([]);
      setListToView([]);
    };
  }, [reports.length]);

  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: (theme) => theme.palette.formColor.main,
          borderRadius: "5px",
        }}
      >
        <Grid container justifyContent="flex-end">
          <Button
            onClick={() => setFilter(filterInit)}
            color="primary"
            variant="contained"
            sx={{ mt: 2, mr: 2 }}
          >
            filter reset
          </Button>
        </Grid>

        <Tabs
          value={valueTab}
          onChange={handleChangeTabs}
          textColor="secondary"
          aria-label="basic tabs example"
        >
          <Tab label="list" {...a11yProps(0)} />
          <Tab label="chart analisys" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Box
        sx={{
          bgcolor: (theme) => theme.palette.formColor.main,
          width: "100%",
          maxHeight: "80vh",
          borderRadius: "5px",
          overflow: "auto",
          p: 1,
        }}
      >
        <TabPanel value={valueTab} index={0}>
          <TableStructure
            filter={filter}
            setFilter={setFilter}
            listReport={listReport}
            listToView={listToView}
            setListReport={setListToView}
            setListToView={setListToView}
            user={user}
            loadingReport={loadingReport}
          />
        </TabPanel>
        <TabPanel value={valueTab} index={1}>
          {listReport.length > 1 && <Chart data={listReport} />}
        </TabPanel>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ m: 2 }}
      >
        <ToExcel data={listToView} sx={{ mr: 2 }} />
        {user.is_facility && <SecondView data={listToView} />}
      </Box>
      {user.admin && (
        <Box>
          <ExcelImport />
        </Box>
      )}
    </>
  );
}
