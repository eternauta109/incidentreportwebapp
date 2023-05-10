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
export const AreaSelect = ({ listReport, setListToView }) => {
  /* console.log("AreaSelect"); */
  const [area, setArea] = useState("all");
  const areaStateInit = [1, 2, 3, 4, "all"];
  useEffect(() => {
    /* console.log("ciaoo"); */
    if (area === "all") {
      return setListToView(listReport);
    } else {
      const arrayCommun = listReport.filter((item) => item.area === area);
      return setListToView(arrayCommun);
    }
  }, [area]);

  return (
    <FormControl sx={{ width: "100px" }}>
      <InputLabel sx={{ color: "white", fontWeight: "bold" }}>area</InputLabel>
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

//data filter
export const DataSorter = ({
  val,
  listReport,
  setListToView,
  sortDirection,
  setSortDirection,
}) => {
  //Functio to use
  /* console.log("datasorter"); */
  function sortAscendateDate(a, b) {
    let dataA = new Date();
    let dataB = new Date();

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

    console.log("asc");
    if (dataA || dataB) {
      if (dataA < dataB) {
        return -1;
      }
      if (dataA > dataB) {
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
          aria-label="upload picture"
          component="span"
          onClick={() => {
            setListToView(listReport.sort(sortAscendateDate));
            setSortDirection(() => !sortDirection);
          }}
        >
          <ArrowDropUpIcon />
        </IconButton>
      ) : (
        <IconButton
          color="secondary"
          aria-label="upload picture"
          component="span"
          onClick={() => {
            setListToView(listReport.sort(sortDescendentDate));
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
export const SelectCinema = ({
  user,
  listReport,
  setListToView,
  listToView,
}) => {
  /* console.log("selectCinema"); */
  const [cinemaSelected, setCinemaSelected] = useState([]);

  useEffect(() => {
    if (cinemaSelected.length < 1) {
      setListToView(listReport);
    } else {
      cinemaSelected.forEach(() => {
        const arrayCommun = listReport.filter((item) =>
          cinemaSelected.some((item2) => item2 === item.cinema)
        );

        setListToView([...arrayCommun]);
        /* console.log("arrayCommun", arrayCommun);
        console.log("listToView", listToView); */
      });
    }
  }, [cinemaSelected]);

  return (
    <FormControl sx={{ width: "100px" }}>
      <InputLabel sx={{ color: "white", fontWeight: "bold" }}>
        Cinema
      </InputLabel>
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

//category filters
export const SelectCategory = ({ listReport, setListToView }) => {
  const [categorySelected, setCategorySelected] = useState([]);
  /* console.log("categoryfilter"); */
  useEffect(() => {
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

  return (
    <FormControl sx={{ width: "110px" }}>
      <InputLabel sx={{ color: "white", fontWeight: "bold" }}>
        Category
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

// issuse state filter
export const SelectSolved = ({ listReport, setListToView }) => {
  const [solvedState, setSolvedState] = useState("");
  const solvedStateInit = ["solved", "in progress", "all"];
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

  return (
    <FormControl sx={{ width: "110px" }}>
      <InputLabel sx={{ color: "white", fontWeight: "bold" }}>
        issue state
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

// screen state filter
export const SelectScreenState = ({ listReport, setListToView }) => {
  const [screenState, setScreenState] = useState("all");
  const screenStateInit = ["open", "closed", "all"];
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
  return (
    <FormControl sx={{ width: "110px" }}>
      <InputLabel sx={{ color: "white", fontWeight: "bold" }}>
        screen state
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
