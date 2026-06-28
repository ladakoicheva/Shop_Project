import { doc, onSnapshot } from "firebase/firestore";
import { APP_DB } from "../index";


export const connectLiveSetting = (callBack, uid) => {
  const link = doc(APP_DB, 'settings', uid);
  const unsubscribe = onSnapshot(link, (doc) => {
    const data = doc.data()
    console.log(data,uid)
    callBack(data);
  })
  return unsubscribe
}