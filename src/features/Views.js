import { useState, useEffect, useMemo } from "react";
import {
  Container,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import LineTable from "./LineTable";
import ReportsServices from "../services/reportsServices";
import Table from "react-bootstrap/Table";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { cinemaList, categoryList } from "../config/structure";

import { useLoaderData, useLocation } from "react-router-dom";

const solvedStateInit = ["solved", "in progress", "all"];

export default function View() {
  const [listReport, setListReport] = useState([]);
  const [listToView, setListToView] = useState([]);

  const [cinemaSelected, setCinemaSelected] = useState([]);
  const [categorySelected, setCategorySelected] = useState([]);
  const [solvedState, setSolvedState] = useState([]);

  const [sortDirection, setSortDirection] = useState(true);
  const { state } = useLocation();
  const { user } = state;

  const loadReport = async () => {
    let querySnapshot;
    console.log("qui");
    if (user.is_facility) {
      try {
        querySnapshot = await ReportsServices.getAllReport().then();
      } catch (err) {
        console.log("get all reports for facility errors", err);
      }
    } else {
      try {
        querySnapshot = await ReportsServices.getCinemaReport(user.cinema.name);
      } catch (err) {
        console.log("get all reports for cinema errors", err);
      }
    }

    setListToView(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
    );
    setListReport(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
    );
  };

  //FILTER
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
          {/* <MenuItem
            onClick={() => {
              setCinemaSelected([]);
            }}
          >
            ALL
          </MenuItem> */}
          {cinemaList.map((el, key) => (
            <MenuItem key={key} value={el}>
              {el.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

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

  const findCinemaInReport = useMemo(() => {
    console.log(cinemaSelected.length);

    if (cinemaSelected.length < 1) {
      setListToView(listReport);
    } else {
      cinemaSelected.forEach((el) => {
        const arrayCommun = listReport.filter((item) =>
          cinemaSelected.some((item2) => item2.name === item.cinema)
        );
        console.log(cinemaSelected.length);
        setListToView(arrayCommun);
      });
    }

    if (categorySelected.length < 1) {
      setListToView(listReport);
    } else {
      categorySelected.forEach((el) => {
        const arrayCommun = listReport.filter((item) =>
          categorySelected.some((item2) => item2 === item.category)
        );

        setListToView(arrayCommun);
      });
    }
  }, [cinemaSelected, categorySelected]);

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

  useEffect(() => {
    loadReport();
    console.log("list report in use effect", listReport);
    return () => {
      console.log("Child unmounted");
      setListReport([]);
    };
  }, []);

  return (
    <Container
      sx={{
        bgcolor: "#f9fbe7",
        width: "100%",
        borderRadius: "5px",
        opacity: 0.9,
        p: 1,
      }}
    >
      {listToView && (
        <Container sx={{ fontSize: "0.8rem" }}>
          <Table id="table-to-xls" striped bordered hover responsive>
            <thead>
              <tr>
                <th scope="col">
                  <DataSorter val="startDate" />
                </th>
                <th scope="col">
                  <DataSorter val="endDate" />
                </th>
                <th scope="col">
                  <SelectCinema />
                </th>
                <th scope="col">
                  <Typography>screens num </Typography>
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
                <th scope="col">
                  <SelectCategory />
                </th>
                <th scope="col">
                  <Typography>screen state</Typography>
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
                <th scope="col">
                  <Typography>issues</Typography>
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
            <tbody>
              {listToView.length > 0 ? (
                listToView.map((val, key) => (
                  <LineTable key={key} report={val} />
                ))
              ) : (
                <tr>
                  <th>loading</th>
                </tr>
              )}
            </tbody>
          </Table>
          <Box sx={{ mt: 2 }}>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button btn btn-success mb-3"
              table="table-to-xls"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Export Data to Excel Sheet"
            />
          </Box>
        </Container>
      )}
    </Container>
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
