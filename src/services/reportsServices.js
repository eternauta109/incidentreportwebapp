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
  try {
    await addDoc(reportsCollectionRef, newReport).then((docRef) => {
      return updateDoc(docRef, { idDoc: docRef.id });
    });
  } catch {
    (err) => console.log("error in report add:", err);
  }
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

export const getRefNum = async (cinema) => {
  const q = query(reportsCollectionRef, where("cinema", "==", cinema));
  const snapshot = await getCountFromServer(q);
  const res = snapshot.data().count;
  console.log("count: ", res);
  return res;
};

export default new ReportsServices();
