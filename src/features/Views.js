import { useState, useEffect, useMemo } from "react";
import {
  Container,
  Box,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControl,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { getAllReports, getCinemaReports } from "../store/slice/reportsSlice";
import { useDispatch, useSelector } from "react-redux";
import LineTable from "./LineTable";

import Table from "react-bootstrap/Table";
import Chart from "./Chart";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { categoryList } from "../config/structure";
/* import ExcelImport from "./ExcelImport"; */
import ToExcel from "./ToExcel";
import dayjs from "dayjs";
import "dayjs/locale/it";
dayjs.locale("it");

import { useLoaderData, useLocation } from "react-router-dom";

const solvedStateInit = ["solved", "in progress", "all"];
const screenStateInit = ["open", "closed", "all"];
const areaStateInit = [1, 2, 3, 4, "all"];

export default function View() {
  const reports = useSelector((state) => state.reports);
  const [listReport, setListReport] = useState([]);
  const [listToView, setListToView] = useState([]);
  const [loadingReport, setLoadingReport] = useState(true);
  const [area, setArea] = useState("all");
  const [cinemaSelected, setCinemaSelected] = useState([]);
  const [categorySelected, setCategorySelected] = useState([]);
  const [solvedState, setSolvedState] = useState("all");
  const [screenState, setScreenState] = useState("all");
  const [sortDirection, setSortDirection] = useState(true);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { user } = state;

  //FILTER
  //data filter
  const DataSorter = ({ val }) => {
    return (
      <Stack direction="row" spacing={0}>
        <Typography>{val}</Typography>
        {sortDirection ? (
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() => {
              setSortDirection(() => !sortDirection);
              setListToView(listReport.sort(sortAscendateDate));
            }}
          >
            <ArrowDropUpIcon />
          </IconButton>
        ) : (
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() => {
              setSortDirection(() => !sortDirection);
              setListToView(listReport.sort(sortDescendentDate));
            }}
          >
            <ArrowDropDownIcon />
          </IconButton>
        )}
      </Stack>
    );
  };
  //cinema select filter
  const SelectCinema = () => {
    return (
      <FormControl sx={{ width: "100px" }}>
        <InputLabel id="demo-simple-select-label">Cinema</InputLabel>
        <Select
          multiple
          value={cinemaSelected}
          label="Cinema"
          onChange={(e) => setCinemaSelected(e.target.value)}
        >
          {user.cinema.map((el, key) => (
            <MenuItem key={key} value={el}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  useEffect(() => {
    console.log("cinemaSelected", cinemaSelected, listReport);
    if (cinemaSelected.length < 1) {
      setListToView(listReport);
    } else {
      cinemaSelected.forEach(() => {
        const arrayCommun = listReport.filter((item) =>
          cinemaSelected.some((item2) => item2 === item.cinema)
        );

        setListToView([...arrayCommun]);
        console.log("arrayCommun", arrayCommun);
        console.log("listToView", listToView);
      });
    }
  }, [cinemaSelected]);

  //category filters
  const SelectCategory = () => {
    return (
      <FormControl sx={{ width: "110px" }}>
        <InputLabel id="demo-simple-select-label">
          <Typography>Category</Typography>
        </InputLabel>
        <Select
          multiple
          value={categorySelected}
          label="Category"
          onChange={(e) => setCategorySelected(e.target.value)}
        >
          {categoryList.map((el, key) => (
            <MenuItem key={key} value={el}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  useEffect(() => {
    console.log("cinemaSelected", cinemaSelected, listReport);

    if (categorySelected.length < 1) {
      setListToView(listReport);
    } else {
      categorySelected.forEach(() => {
        const arrayCommun = listReport.filter((item) =>
          categorySelected.some((item2) => item2 === item.category)
        );

        setListToView(arrayCommun);
      });
    }
  }, [categorySelected]);

  // area filter
  const AreaSelect = () => {
    return (
      <FormControl sx={{ width: "100px" }}>
        <InputLabel id="demo-simple-select-label">
          <Typography>area</Typography>
        </InputLabel>
        <Select
          value={area}
          label="area"
          onChange={(e) => setArea(e.target.value)}
        >
          {areaStateInit.map((el, key) => (
            <MenuItem key={key} value={el}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  useMemo(() => {
    if (area === "all") {
      return setListToView(listReport);
    } else {
      const arrayCommun = listReport.filter((item) => item.area === area);
      return setListToView(arrayCommun);
    }
  }, [area]);

  // issuse state filter
  const SelectSolved = () => {
    return (
      <FormControl sx={{ width: "110px" }}>
        <InputLabel id="demo-simple-select-label">
          <Typography>issue state</Typography>
        </InputLabel>
        <Select
          value={solvedState}
          label="issueState"
          onChange={(e) => setSolvedState(e.target.value)}
        >
          {solvedStateInit.map((el, key) => (
            <MenuItem key={key} value={el}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  useMemo(() => {
    if (solvedState === "all") {
      return setListToView(listReport);
    }

    if (solvedState === "in progress") {
      const arrayCommun = listReport.filter((item) => item.resolved === false);
      setListToView(arrayCommun);
    }

    if (solvedState === "solved") {
      const arrayCommun = listReport.filter((item) => item.resolved === true);
      setListToView(arrayCommun);
    }
  }, [solvedState]);

  // screen state filter
  const SelectScreenState = () => {
    return (
      <FormControl sx={{ width: "110px" }}>
        <InputLabel id="demo-simple-select-label">
          <Typography>screen state</Typography>
        </InputLabel>
        <Select
          value={screenState}
          label="screenState"
          onChange={(e) => setScreenState(e.target.value)}
        >
          {screenStateInit.map((el, key) => (
            <MenuItem key={key} value={el}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  useMemo(() => {
    if (screenState === "all") {
      return setListToView(listReport);
    }

    if (screenState === "open") {
      const arrayCommun = listReport.filter(
        (item) => item.screen_state === "open"
      );
      setListToView(arrayCommun);
    }

    if (screenState === "closed") {
      const arrayCommun = listReport.filter(
        (item) => item.screen_state === "closed"
      );
      setListToView(arrayCommun);
    }
  }, [screenState]);

  const loadReport = () => {
    console.log("user in viewser", user);
    if (user.is_facility) {
      try {
        dispatch(getAllReports())
          .then((report) => {
            setListToView(report);
            setListReport(report);
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
            setListToView(report);
            setListReport(report);
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
    console.log("list report in use effect", listReport);
  }, [listReport]);

  useEffect(() => {
    console.log("reports", reports);
    if (reports.length > 0) {
      setListToView([...reports]);
      setListReport([...reports]);
      setLoadingReport(false);
    } else {
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
          p: 1,
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
                    <DataSorter val="startDate" />
                  </Typography>
                </th>
                <th>
                  <Typography style={{ width: "130px" }}>
                    <DataSorter val="endDate" />
                  </Typography>
                </th>
                <th>
                  <Typography style={{ width: "130px" }}>
                    <DataSorter val="datePrediction" />
                  </Typography>
                </th>
                <th>
                  <Typography style={{ width: "150px" }}>
                    <SelectCinema />
                  </Typography>
                </th>
                <th scope="col">
                  <Typography style={{ width: "100px" }}>
                    <AreaSelect />
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
                    <SelectCategory />
                  </Typography>
                </th>
                <th scope="col">
                  <Typography>
                    <SelectScreenState />
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
                  <SelectSolved />
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

//Functio to use

function sortAscendateDate(a, b) {
  /* console.log(a, b); */
  const dataA = new Date(a.startDate.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
  const dataB = new Date(b.startDate.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"

  if (dataA < dataB) {
    return -1;
  }
  if (dataA > dataB) {
    return 1;
  }
  return 0;
}

function sortDescendentDate(a, b) {
  /* console.log(a, b); */
  const dataA = new Date(a.startDate.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
  const dataB = new Date(b.startDate.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"

  if (dataA > dataB) {
    return -1;
  }
  if (dataA < dataB) {
    return 1;
  }
  return 0;
}
