import { db, auth } from "../config/firebase";
import { signOut } from "firebase/auth";

import {
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  getDoc,
  getCountFromServer,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const reportsCollectionRef = collection(db, "reports");

class ReportsServices {
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

  logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("usciti", auth.currentUser);
      })
      .catch((e) => {
        console.log("error logout", e);
      });
  };
}

export const addReport = async (newReport) => {
  console.log("addReport", newReport);

  return new Promise(async (resolve, reject) => {
    try {
      const docRef = await addDoc(reportsCollectionRef, newReport);
      await updateDoc(docRef, { idDoc: docRef.id });

      resolve(docRef.id);
      /* const reportDoc = doc(db, "reports", docRef.id);
      const snapshot = await getDoc(reportDoc);
      const updatedReport = { ...newReport, idDoc: docRef.id };
      console.log("new report", updatedReport); */

      /* await addDoc(reportsCollectionRef, newReport).then((docRef) => {
      updateDoc(docRef, { idDoc: docRef.id });
      const reportDoc = doc(db, "reports", docRef.id);
      console.log("new report", reportDoc);
      return getDoc(reportDoc); */
    } catch {
      (err) => console.log("error in report add:", err);
      reject(err);
    }
  });
};

export const updateReport = async (id, updateReport) => {
  console.log("update", id, updateReport);
  const userRef = doc(db, "reports", id);
  try {
    return await updateDoc(userRef, { ...updateReport });
  } catch {
    (err) => console.log("error in report add:", err);
  }
};

export const deleteReport = async (id) => {
  console.log("delete", id);
  const reportRef = doc(db, "reports", id);
  try {
    console.log("eliminato");
    return await deleteDoc(reportRef);
  } catch (err) {
    console.log("error in report delete:", err);
  }
};

//prendo il numero di ref
export const getRefNum = async (cinema) => {
  const q = query(reportsCollectionRef, where("cinema", "==", cinema));
  const snapshot = await getCountFromServer(q);
  const res = snapshot.data().count;
  /* console.log("count: ", res); */
  return res;
};

export default new ReportsServices();
