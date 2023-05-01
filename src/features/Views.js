import { useState, useEffect, useMemo } from "react";
import { Container, Box, Button, Typography } from "@mui/material";
import { getAllReports, getCinemaReports } from "../store/slice/reportsSlice";
import { useDispatch, useSelector } from "react-redux";
import LineTable from "./LineTable";
import Table from "react-bootstrap/Table";
import Chart from "./Chart";
/* import ExcelImport from "./ExcelImport"; */
import ToExcel from "./ToExcel";
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

export default function View() {
  const reports = useSelector((state) => state.reports);
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
        getCinemaReports({ cinemaUser })
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
      <Container
        sx={{
          bgcolor: "#f9fbe7",
          width: "100%",
          maxHeight: "80vh",
          borderRadius: "5px",
          overflow: "auto",
          opacity: 0.9,
          p: 3,
        }}
      >
        <Container sx={{ fontSize: "0.8rem" }}>
          <Table id="table-to-xls" sx={{ maxHeight: 500 }} striped bordered>
            <thead>
              <tr sx={{ bgcolor: "grey" }}>
                <th>
                  <Typography style={{ width: "10px" }}>
                    report number{" "}
                  </Typography>
                </th>
                <th>
                  <Typography style={{ width: "130px" }}>
                    <DataSorter
                      val="startDate"
                      sortDirection={sortDirection}
                      setSortDirection={setSortDirection}
                      listReport={listReport}
                      setListToView={setListToView}
                    />
                  </Typography>
                </th>
                <th>
                  <Typography style={{ width: "130px" }}>
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
                  <Typography style={{ width: "130px" }}>
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
                  <Typography style={{ width: "150px" }}>
                    <SelectCinema
                      user={user}
                      listReport={listReport}
                      listToView={listToView}
                      setListToView={setListToView}
                    />
                  </Typography>
                </th>
                <th scope="col">
                  <Typography style={{ width: "100px" }}>
                    <AreaSelect
                      listReport={listReport}
                      setListToView={setListToView}
                    />
                  </Typography>
                </th>
                <th>
                  <Typography style={{ width: "45px" }}>
                    screens num{" "}
                  </Typography>
                </th>
                <th scope="col">
                  <Typography>total seats</Typography>
                </th>
                <th scope="col">
                  <Typography>screen with issue</Typography>
                </th>
                <th scope="col">
                  <Typography>seats screen number</Typography>{" "}
                </th>
                <th>
                  <Typography style={{ width: "200px" }}>
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
                  <Typography>show close</Typography>
                </th>
                <th scope="col">
                  <Typography>refounds</Typography>
                </th>
                <th scope="col">
                  <Typography>comps</Typography>
                </th>
                <th>
                  <Typography style={{ width: "200px" }}>issues</Typography>
                </th>
                <th scope="col">
                  <Typography>note</Typography>
                </th>
                <th scope="col">
                  <SelectSolved
                    listReport={listReport}
                    setListToView={setListToView}
                  />
                </th>
                <th scope="col">
                  <Typography>work day</Typography>
                </th>
                {/*   <th scope="col">resolution day</th> */}
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
        </Container>
      </Container>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ m: 2 }}
      >
        <ToExcel data={listToView} />
        {user.is_facility && (
          <Button variant="contained" sx={{ ml: 1, mr: 1 }}>
            Grandinetti view
          </Button>
        )}
        {/* <ExcelImport /> */}
      </Box>

      {listReport.length > 1 && <Chart data={listReport} />}
    </>
  );
}
