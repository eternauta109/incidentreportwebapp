import { useState, useEffect, useMemo } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Stack,
  IconButton,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { categoryList } from "../../config/structure";

// area filter
export const AreaSelect = ({
  listReport,
  setListToView,
  filter,
  setFilter,
  listToView,
}) => {
  const areaStateInit = [1, 2, 3, 4, "all"];

  return (
    <FormControl sx={{ width: "100px" }}>
      <InputLabel sx={{ color: "white", fontWeight: "bold" }}>area</InputLabel>
      <Select
        value={filter.areaSelect}
        label="area"
        onChange={(e) =>
          setFilter((prev) => ({ ...prev, areaSelect: e.target.value }))
        }
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

//data filter
export const DataSorter = ({
  val,
  listReport,
  listToView,
  setListToView,
  sortDirection,
  setSortDirection,
}) => {
  function sortAscendateDate(a, b) {
    /* console.log("startdate a e b ", a.startDate, b.startDate); */
    let dataA = new Date();
    let dataB = new Date();
    /* console.log("startdate a e b ", dataA, dataB); */
    switch (val) {
      case "startDate":
        dataA = new Date(a.startDate.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
        dataB = new Date(b.startDate.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
        break;
      case "endDate":
        if (!a.endDate) {
          dataA = new Date("2100/12/31");
        } else if (!b.endDate) {
          dataB = new Date("2100/12/31");
        } else {
          dataA = new Date(a.endDate.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
          dataB = new Date(b.endDate.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
        }
        break;
      case "datePrediction":
        if (!a.datePrediction) {
          dataA = new Date("2100/12/31");
        } else if (!b.datePrediction) {
          dataB = new Date("2100/12/31");
        } else {
          dataA = new Date(a.datePrediction.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
          dataB = new Date(b.datePrediction.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
        }
        break;

      default:
        break;
    }

    if (dataA || dataB) {
      if (dataA <= dataB) {
        return -1;
      }
      if (dataA >= dataB) {
        return 1;
      }
    }

    return 0;
  }

  function sortDescendentDate(a, b) {
    let dataA = new Date();
    let dataB = new Date();
    switch (val) {
      case "startDate":
        dataA = new Date(
          a.startDate.split("/").reverse().join("-") + "T00:00:00"
        ); // converte la data nel formato "YYYY-MM-DD"

        dataB = new Date(b.startDate.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"

        break;
      case "endDate":
        if (!a.endDate) {
          dataA = new Date("2100/12/31");
        } else if (!b.endDate) {
          dataB = new Date("2100/12/31");
        } else {
          dataA = new Date(a.endDate.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
          dataB = new Date(b.endDate.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
        }
        break;
      case "datePrediction":
        if (!a.datePrediction) {
          dataA = new Date("2100/12/31");
        } else if (!b.datePrediction) {
          dataB = new Date("2100/12/31");
        } else {
          dataA = new Date(a.datePrediction.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
          dataB = new Date(b.datePrediction.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
        }
        break;

      default:
        break;
    }

    if (dataA > dataB) {
      return -1;
    }
    if (dataA < dataB) {
      return 1;
    }
    return 0;
  }
  return (
    <Stack direction="row" spacing={0}>
      {sortDirection ? (
        <IconButton
          color="secondary"
          component="span"
          onClick={() => {
            /*   console.log(listToView);
            const newArray = [...listToView];
            console.log("new", newArray);
            setListToView(newArray.sort(sortAscendateDate)); */
            setListToView((prev) => [...prev.sort(sortAscendateDate)]);
            setSortDirection(() => !sortDirection);
          }}
        >
          <ArrowDropUpIcon />
        </IconButton>
      ) : (
        <IconButton
          color="secondary"
          component="span"
          onClick={() => {
            /* const newArray = listToView.sort(sortDescendentDate);
            setListToView(newArray); */
            setListToView((prev) => [...prev.sort(sortDescendentDate)]);
            setSortDirection(() => !sortDirection);
          }}
        >
          <ArrowDropDownIcon />
        </IconButton>
      )}
    </Stack>
  );
};

//cinema select filter
export const SelectCinema = ({ filter, setFilter, user }) => {
  useEffect(() => {}, [filter.cinemaSelected]);

  return (
    <FormControl sx={{ width: "100px" }}>
      <InputLabel sx={{ color: "white", fontWeight: "bold" }}>
        Cinema
      </InputLabel>
      <Select
        multiple
        value={filter.cinemaSelected}
        label="Cinema"
        onChange={(e) =>
          setFilter((prev) => ({ ...prev, cinemaSelected: e.target.value }))
        }
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

//category filters
export const SelectCategory = ({ filter, setFilter }) => {
  return (
    <FormControl sx={{ width: "110px" }}>
      <InputLabel sx={{ color: "white", fontWeight: "bold" }}>
        Category
      </InputLabel>
      <Select
        multiple
        value={filter.categorySelected}
        label="Category"
        onChange={(e) =>
          setFilter((prev) => ({ ...prev, categorySelected: e.target.value }))
        }
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

// issuse state filter
export const SelectSolved = ({
 
  filter,
  setFilter,

}) => {
  const solvedStateInit = ["solved", "in progress", "all"];

  return (
    <FormControl sx={{ width: "110px" }}>
      <InputLabel sx={{ color: "white", fontWeight: "bold" }}>
        issue state
      </InputLabel>
      <Select
        value={filter.solvedState}
        label="issueState"
        onChange={(e) =>
          setFilter((prev) => ({ ...prev, solvedState: e.target.value }))
        }
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

// screen state filter
export const SelectScreenState = ({

  filter,
  setFilter,

}) => {
  const screenStateInit = ["open", "closed", "all"];

  return (
    <FormControl sx={{ width: "110px" }}>
      <InputLabel sx={{ color: "white", fontWeight: "bold" }}>
        screen state
      </InputLabel>
      <Select
        value={filter.screenState}
        label="screenState"
        onChange={(e) =>
          setFilter((prev) => ({ ...prev, screenState: e.target.value }))
        }
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
