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
export const AreaSelect = ({ filter, setFilter }) => {
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
export const DataSorterStartDate = ({ filter, setFilter }) => {
  return (
    <Stack direction="row" spacing={0}>
      {filter.sorterStDate ? (
        <IconButton
          color="secondary"
          component="span"
          onClick={() => {
            console.log("qui"),
              setFilter((prev) => ({ ...prev, sorterStDate: false }));
          }}
        >
          <ArrowDropUpIcon />
        </IconButton>
      ) : (
        <IconButton
          color="secondary"
          component="span"
          onClick={() => {
            console.log("qua"),
              setFilter((prev) => ({ ...prev, sorterStDate: true }));
          }}
        >
          <ArrowDropDownIcon />
        </IconButton>
      )}
    </Stack>
  );
};

export const DataSorterEndDate = ({ filter, setFilter }) => {
  return (
    <Stack direction="row" spacing={0}>
      {filter.sorterEndDate ? (
        <IconButton
          color="secondary"
          component="span"
          onClick={() => {
            console.log("qui"),
              setFilter((prev) => ({ ...prev, sorterEndDate: false }));
          }}
        >
          {/* <ArrowDropUpIcon /> */}
        </IconButton>
      ) : (
        <IconButton
          color="secondary"
          component="span"
          onClick={() => {
            console.log("qua"),
              setFilter((prev) => ({ ...prev, sorterEndDate: true }));
          }}
        >
          {/* <ArrowDropDownIcon /> */}
        </IconButton>
      )}
    </Stack>
  );
};
export const DataSorterPredDate = ({ filter, setFilter }) => {
  return (
    <Stack direction="row" spacing={0}>
      {filter.sorterPredDate ? (
        <IconButton
          color="secondary"
          component="span"
          onClick={() => {
            console.log("qui"),
              setFilter((prev) => ({ ...prev, sorterPredDate: false }));
          }}
        >
          {/* <ArrowDropUpIcon /> */}
        </IconButton>
      ) : (
        <IconButton
          color="secondary"
          component="span"
          onClick={() => {
            console.log("qua"),
              setFilter((prev) => ({ ...prev, sorterPredDate: true }));
          }}
        >
          {/* <ArrowDropDownIcon /> */}
        </IconButton>
      )}
    </Stack>
  );
};

//cinema select filter
export const SelectCinema = ({ filter, setFilter, user }) => {
  /* useEffect(() => {}, [filter.cinemaSelected]); */

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
export const SelectSolved = ({ filter, setFilter }) => {
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
export const SelectScreenState = ({ filter, setFilter }) => {
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
