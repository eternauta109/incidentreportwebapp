import { createSlice } from "@reduxjs/toolkit";

import dayjs from "dayjs";
import "dayjs/locale/it";

dayjs.locale("it");

const INITIAL_STATE = {
  startDate: dayjs().format("DD/MM/YYYY"),
  datePrediction: dayjs().format("DD/MM/YYYY"),
  resolved: false,
  endDate: null,
  cinema: null,
  screens_number: null,
  seats_number: null,
  area: null,
  screen_with_issue: null,
  screen_with_issue_capacity: null,
  comps: 0,
  category: "altro",
  screen_state: "open",
  refounds: 0,
  show_stopped: 0,
  ref_num: null,
  issue: "",
  note: "",
  redattore: "",
  workDays: null,
};

const reportSlice = createSlice({
  name: "report",
  initialState: { ...INITIAL_STATE },
  reducers: {
    setAllReport: (state, action) => {
      const newReport = action.payload;
      return newReport;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setDatePrediction: (state, action) => {
      state.datePrediction = action.payload;
    },
    setResolved: (state, action) => {
      state.resolved = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setCinema: (state, action) => {
      state.cinema = action.payload;
    },
    setScreens_number: (state, action) => {
      state.screens_number = action.payload;
    },
    setSeats_number: (state, action) => {
      state.seats_number = action.payload;
    },
    setArea: (state, action) => {
      state.area = action.payload;
    },
    setScreen_with_issue: (state, action) => {
      state.screen_with_issue = action.payload;
    },
    setScreen_with_issue_capacity: (state, action) => {
      state.screen_with_issue_capacity = action.payload;
    },
    setComps: (state, action) => {
      state.comps = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setScreen_state: (state, action) => {
      state.screen_state = action.payload;
    },
    setRefounds: (state, action) => {
      state.refounds = action.payload;
    },
    setShow_stopped: (state, action) => {
      state.show_stopped = action.payload;
    },
    setRef_num: (state, action) => {
      state.ref_num = action.payload;
    },
    setIssue: (state, action) => {
      state.issue = action.payload;
    },
    setNote: (state, action) => {
      state.note = action.payload;
    },

    setRedattore: (state, action) => {
      state.redattore = action.payload;
    },
    setWorkDays: (state, action) => {
      state.workDays = action.payload;
    },
    resetReport: (state, action) => {
      return INITIAL_STATE;
    },
    // Add other state update functions here
  },
});

export const {
  setAllReport,
  setStartDate,
  setDatePrediction,
  setResolved,
  setEndDate,
  setCinema,
  setScreens_number,
  setSeats_number,
  setArea,
  setScreen_with_issue,
  setScreen_with_issue_capacity,
  setComps,
  setCategory,
  setScreen_state,
  setRefounds,
  setShow_stopped,
  setRef_num,
  setIssue,
  setNote,
  setRedattore,
  setWorkDays,
  resetReport,
} = reportSlice.actions;

export default reportSlice.reducer;
