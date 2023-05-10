import { useState, useEffect, useMemo } from "react";
import { Container, Box, Button, Typography } from "@mui/material";
import { getAllReports, getCinemaReports } from "../store/slice/reportsSlice";
import { useDispatch, useSelector } from "react-redux";
import LineTable from "./LineTable";
import Table from "react-bootstrap/Table";
import Chart from "./Chart";
/* import ExcelImport from "./ExcelImport"; */
import ToExcel from "./ToExcel";
import SecondView from "./SecondView";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import dayjs from "dayjs";
import "dayjs/locale/it";
import {
  AreaSelect,
  DataSorter,
  SelectCinema,
  SelectCategory,
  SelectSolved,
  SelectScreenState,
} from "./Filters";

dayjs.locale("it");

import { useLocation } from "react-router-dom";

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

export default function View() {
  const reports = useSelector((state) => state.reports);
  const [value, setValue] = useState(0);
  const [listReport, setListReport] = useState([]);
  const [listToView, setListToView] = useState([]);
  const [loadingReport, setLoadingReport] = useState(true);
  const [sortDirection, setSortDirection] = useState(true);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { user } = state;

  const loadReport = () => {
    if (user.is_facility) {
      try {
        dispatch(getAllReports())
          .then((report) => {
            console.log("report lett da firebase: " + report);
            setListToView(report.payload);
            setListReport(report.payload);
            setLoadingReport(false);
          })
          .catch((error) => {
            console.log("get all reports for facility errors", error);
            setLoadingReport(false);
          });
      } catch (err) {
        console.log("get all reports for facility errors", err);
        setLoadingReport(false); // impostiamo isLoading a false anche in caso di errori
      }
    } else {
      try {
        let cinemaUser = user.cinema[0];
        console.log(cinemaUser);
        dispatch(getCinemaReports({ cinema: cinemaUser }))
          .then((report) => {
            console.log("get all reports for", report);
            setListToView(report.payload);
            setListReport(report.payload);
            setLoadingReport(false);
          })
          .catch((error) => {
            console.log("get all reports for cinema errors", error);
            setIsLoading(false);
          });
      } catch (err) {
        console.log("get all reports for cinema errors", err);
        setLoadingReport(false);
      }
    }
  };

  //gestione tabs
  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };

  //setting colore header table
  const headerStyle = {
    color: "white",
    fontWeight: "bold",
  };

  useEffect(() => {
    if (reports.length > 0) {
      console.log("leggo reports da redux");
      setListToView([...reports]);
      setListReport([...reports]);
      setLoadingReport(false);
    } else {
      console.log("leggo reports prima volta da firebase");
      loadReport();
    }

    return () => {
      console.log("Child unmounted");
      setListReport([]);
    };
  }, []);

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
        <Tabs
          value={value}
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

          p: 3,
        }}
      >
        <TabPanel value={value} index={0}>
          <Box
            sx={{
              fontSize: "0.8rem",
              width: "2200px",

              bgcolor: "grey",
            }}
          >
            <Table id="table-to-xls" striped bordered>
              <thead>
                <tr sx={{ bgcolor: "grey" }}>
                  <th>
                    <Typography
                      style={{
                        width: "10px",
                        ...headerStyle,
                      }}
                    >
                      report number{" "}
                    </Typography>
                  </th>
                  <th>
                    <Typography style={{ width: "130px", ...headerStyle }}>
                      Start Date
                      {!loadingReport && (
                        <DataSorter
                          val="startDate"
                          sortDirection={sortDirection}
                          setSortDirection={setSortDirection}
                          listReport={listReport}
                          setListToView={setListToView}
                        />
                      )}
                    </Typography>
                  </th>
                  <th>
                    <Typography style={{ width: "130px", ...headerStyle }}>
                      End Date
                      <DataSorter
                        val="endDate"
                        sortDirection={sortDirection}
                        setSortDirection={setSortDirection}
                        listReport={listReport}
                        setListToView={setListToView}
                      />
                    </Typography>
                  </th>
                  <th>
                    <Typography style={{ width: "130px", ...headerStyle }}>
                      res. pred. date
                      <DataSorter
                        val="datePrediction"
                        sortDirection={sortDirection}
                        setSortDirection={setSortDirection}
                        listReport={listReport}
                        setListToView={setListToView}
                      />
                    </Typography>
                  </th>
                  <th>
                    <Typography style={{ width: "150px", ...headerStyle }}>
                      <SelectCinema
                        user={user}
                        listReport={listReport}
                        listToView={listToView}
                        setListToView={setListToView}
                      />
                    </Typography>
                  </th>
                  {!loadingReport && (
                    <th scope="col">
                      <Typography style={{ width: "100px" }}>
                        <AreaSelect
                          listReport={listReport}
                          setListToView={setListToView}
                        />
                      </Typography>
                    </th>
                  )}
                  <th>
                    <Typography style={{ width: "50px", ...headerStyle }}>
                      screens num{" "}
                    </Typography>
                  </th>
                  <th scope="col">
                    <Typography style={{ ...headerStyle }}>
                      total seats
                    </Typography>
                  </th>
                  <th scope="col">
                    <Typography style={{ ...headerStyle }}>
                      screen with issue
                    </Typography>
                  </th>
                  <th scope="col">
                    <Typography style={{ ...headerStyle }}>
                      seats screen number
                    </Typography>{" "}
                  </th>
                  <th>
                    <Typography style={{ width: "200px", ...headerStyle }}>
                      <SelectCategory
                        listReport={listReport}
                        setListToView={setListToView}
                      />
                    </Typography>
                  </th>
                  <th scope="col">
                    <Typography>
                      <SelectScreenState
                        listReport={listReport}
                        setListToView={setListToView}
                      />
                    </Typography>
                  </th>
                  <th scope="col">
                    <Typography style={{ ...headerStyle }}>
                      show close
                    </Typography>
                  </th>
                  <th scope="col">
                    <Typography style={{ ...headerStyle }}>refounds</Typography>
                  </th>
                  <th scope="col">
                    <Typography style={{ ...headerStyle }}>comps</Typography>
                  </th>
                  <th>
                    <Typography style={{ width: "200px", ...headerStyle }}>
                      issues
                    </Typography>
                  </th>
                  <th scope="col">
                    <Typography sx={{ ...headerStyle }}>note</Typography>
                  </th>
                  <th scope="col">
                    <Typography sx={{ ...headerStyle }}>issue state</Typography>
                    {!loadReport && (
                      <SelectSolved
                        listReport={listReport}
                        setListToView={setListToView}
                      />
                    )}
                  </th>
                  <th scope="col">
                    <Typography sx={{ ...headerStyle }}>work day</Typography>
                  </th>
                  <th scope="col">
                    <Typography sx={{ ...headerStyle }}>action</Typography>
                  </th>
                </tr>
              </thead>
              {!loadingReport && listToView && listToView.length > 0 && (
                <tbody sx={{ overflow: "auto", height: "400px" }}>
                  {listToView.map((val, key) => (
                    <LineTable key={key} report={val} />
                  ))}
                </tbody>
              )}
              {!loadingReport && listToView.length === 0 && (
                <tbody>
                  <tr>
                    <th>no reports</th>
                  </tr>
                </tbody>
              )}
              {loadingReport && (
                <tbody>
                  <tr>
                    <th>Loading...</th>
                  </tr>
                </tbody>
              )}
            </Table>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
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
        {/* <ExcelImport /> */}
      </Box>
    </>
  );
}
