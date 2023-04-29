import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getDoc,
  doc,
  setDoc,
  getDocs,
  arrayUnion,
  updateDoc,
  where,
  arrayRemove,
  query,
  collection,
} from "firebase/firestore";
import { cinemaList } from "../../config/structure";
import { auth, db } from "../../config/firebase.js";

export const getReports = createAsyncThunk("reports/getReports", async () => {
  getAllReport = () => {
    return getDocs(reportsCollectionRef);
  };

  getReport = (id) => {
    const reportDoc = doc(db, "reports", id);
    return getDoc(reportDoc);
  };

  await signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      userUid = cred.user.uid;
      metaData = cred.user.metadata;
    })
    .catch((err) => {
      return alert("login error", err.message);
    });

  let userDocRef = doc(db, "users", userUid);

  const res = await getDoc(userDocRef)
    .then((r) => {
      return r.data();
    })
    .catch((e) => alert("error in getDoc-getUser in userSlice:", e.message));
  /* console.log("res cinema", res.cinema[0]); */
  const cinemaDet = cinemaList.find((e) => e.name === res.cinema[0]);

  return { ...res, cinemaDet };
});

export const setNewCinema = createAsyncThunk(
  "user/setNewCinema",
  async ({ cinemaFind }, { dispatch, getState }) => {
    /* console.log("state new cinema det", cinemaFind); */
    const state = getState(); // <-- qui ottieni lo state
    /*  console.log("state new cinema state", state); */
    const res = await { ...state.user, cinemaDet: cinemaFind };
    /* console.log("state new cinema res", res); */
    return res;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    userLogOut(state) {
      state = null;
      return state;
      // Note that this should be left intentionally empty.
      // Clearing redux state and localForage happens in rootReducer.ts.
    },
    /* setNewCinema(state, newCinemaDet) {
      console.log("state new cinema det", newCinemaDet);
      return { ...state, cinemaDet: newCinemaDet.payload };
      // Note that this should be left intentionally empty.
      // Clearing redux state and localForage happens in rootReducer.ts.
    }, */
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        /*  console.log("loading"); */
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(setNewCinema.pending, (state, action) => {
        /* console.log("loading"); */
      })
      .addCase(setNewCinema.fulfilled, (state, action) => {
        state = action.payload;
        return state;
        /*  console.log("loading"); */
      });
  },
});

const { actions, reducer } = userSlice;
export const { userLogOut } = userSlice.actions;
export default reducer;
