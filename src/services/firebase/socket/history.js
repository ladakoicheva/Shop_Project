import { doc, onSnapshot } from "firebase/firestore";
import { APP_DB } from "../index";

// /user/lipM1AJlVOdesdQU8fkaz438Dym1

export const connectLiveHistorySum = (callback, uid) => {
  const link = doc(APP_DB, "user", uid);
  const unsubscribe = onSnapshot(
    link,
    (doc) => {
      const data = doc.data().sum;
      callback(data)
    }
  );

  return unsubscribe
}