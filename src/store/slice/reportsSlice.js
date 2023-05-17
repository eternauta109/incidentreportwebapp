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
    console.log("getAllReports");
    reportsSnap.forEach((doc) => {
      console.log("conta");
      let report = { ...doc.data(), workDays: workDaysCalculate(doc.data()) };
      reports = [...reports, report];
    });
    console.log("reports in getAllReports", reports);
    return reports;
  }
);
export const getCinemaReports = createAsyncThunk(
  "reports/getCinemaReports",
  async ({ cinema }) => {
    console.log("cinema in store", cinema);
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
    const currentReportsState = getState().reports;
    return [...currentReportsState, report];
  }
);

export const updateReportRedux = createAsyncThunk(
  "reports/updatereport",
  async ({ reportId, updates }, { getState, dispatch }) => {
    console.log("reportId", reportId);
    console.log("updates", updates);
    const state = getState();
    const reports = state.reports;
    // Cerca il report con l'ID corrispondente e aggiornalo con i nuovi valori
    const updatedReports = reports.map((report) => {
      if (report.idDoc === reportId) {
        return { ...report, ...updates };
      }
      return report;
    });
    return updatedReports;
  }
);

export const deleteReportRedux = createAsyncThunk(
  "reports/deletereport",
  async (reportId, { getState, dispatch }) => {
    console.log("reportId", reportId);
    const state = getState();
    const reports = state.reports;
    // Filtra i report, escludendo il report con l'ID corrispondente
    const updatedReports = reports.filter(
      (report) => report.idDoc !== reportId
    );
    return updatedReports;
  }
);

export const reportsSlice = createSlice({
  name: "reports",
  initialState: [],
  reducers: {
    reportsLogOut(state) {
      state = [];
      return state;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllReports.pending, (state, action) => {
        /*  console.log("loading"); */
      })
      .addCase(getAllReports.fulfilled, (state, action) => {
        console.log("action.payload: ", action.payload);
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
        state = action.payload;
        return state;
      })
      .addCase(updateReportRedux.pending, (state, action) => {
        /*  console.log("loading"); */
      })
      .addCase(updateReportRedux.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(deleteReportRedux.pending, (state, action) => {
        /*  console.log("loading"); */
      })
      .addCase(deleteReportRedux.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      });
  },
});

const { actions, reducer } = reportsSlice;
export const { reportsLogOut } = reportsSlice.actions;
export default reducer;
