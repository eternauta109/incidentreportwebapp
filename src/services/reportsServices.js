import { db, auth } from "../config/firebase";
import { signOut } from "firebase/auth";

import {
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  getDoc,
  onSnapshot,

  addDoc,
  doc,
  ref,
  set,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

const reportsCollectionRef = collection(db, "reports");

class ReportsServices {
  addReport = (newReport) => {
    return addDoc(reportsCollectionRef, newReport);
  };

  updateReport = (id, updateReport) => {
    const reportDoc = doc(db, "reports", id);
    return updateDoc(reportDoc, updateReport);
  };

  deleteReport = (id) => {
    const reportDoc = doc(db, "reports", id);
    return deleteDoc(reportDoc);
  };

  getAllReport = () => {
    return getDocs(reportsCollectionRef);
  };

  getReport = (id) => {
    const reportDoc = doc(db, "reports", id);
    return getDoc(reportDoc);
  };

  getCinemaReport = (cinema) => {
    const q = query(reportsCollectionRef, where("cinema", "==", cinema));

    return getDocs(q);
  };

 /*  getRefNum = (cinema) => {
    const q = query(reportsCollectionRef, where("cinema", "==", cinema));
    const snapshot = getCountFromServer(q);
    console.log("count: ", snapshot.data().count);
    return snapshot.data().count;
    // Do something with the count
  }; */

  logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("usciti", auth.currentUser);
      })
      .catch((error) => {
        console.log("error logout", e);
      });
  };
}

export default new ReportsServices();
