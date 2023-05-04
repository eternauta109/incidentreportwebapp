import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getDocs, where, query, collection } from "firebase/firestore";
import { cinemaList } from "../../config/structure";
import { db } from "../../config/firebase.js";
import dayjs from "dayjs";
import "dayjs/locale/it";
dayjs.locale("it");

const reportsCollectionRef = collection(db, "reports");

const workDaysCalculate = (report) => {
  let days;
  /* console.log("doc", report); */
  if (report.resolved) {
    days = dayjs(report.endDate, "DD/MM/YYYY").diff(
      dayjs(report.startDate, "DD/MM/YYYY"),
      "day"
    );
  } else {
    days = dayjs().diff(dayjs(report.startDate, "DD/MM/YYYY"), "day");
  }
  /* console.log(days); */
  return days;
};

export const getAllReports = createAsyncThunk(
  "reports/getAllReports",
  async () => {
    let reports = [];
    const reportsSnap = await getDocs(reportsCollectionRef);
    reportsSnap.forEach((doc) => {
      let report = { ...doc.data(), workDays: workDaysCalculate(doc.data()) };
      reports = [...reports, report];
    });
    return reports;
  }
);
export const getCinemaReports = createAsyncThunk(
  "reports/getCinemaReports",
  async ({ cinema }) => {
    let reports = [];
    const q = query(reportsCollectionRef, where("cinema", "==", cinema));
    const reportsSnap = await getDocs(q);
    reportsSnap.forEach((doc) => {
      let report = { ...doc.data(), workDays: workDaysCalculate(doc.data()) };
      reports = [...reports, report];
    });
    return reports;
  }
);

export const addReportRedux = createAsyncThunk(
  "reports/addreport",
  async ({ report }, { getState }) => {
    console.log(report);
    console.log(getState.reducer);
    let reports = [];
  }
);

export const reportsSlice = createSlice({
  name: "reports",
  initialState: [],

  extraReducers: (builder) => {
    builder
      .addCase(getAllReports.pending, (state, action) => {
        /*  console.log("loading"); */
      })
      .addCase(getAllReports.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(getCinemaReports.pending, (state, action) => {
        /*  console.log("loading"); */
      })
      .addCase(getCinemaReports.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(addReportRedux.pending, (state, action) => {
        /*  console.log("loading"); */
      })
      .addCase(addReportRedux.fulfilled, (state, action) => {
        console.log(state);
        state = action.payload;
        return state;
      });
  },
});

const { actions, reducer } = reportsSlice;

export default reducer;
