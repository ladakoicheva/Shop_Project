import { doc, onSnapshot } from "firebase/firestore";
import { APP_DB } from "../index";
import type { Settings } from "../../../redux/auth/type";


export const connectLiveSetting = (callBack:(data:Settings)=>void, uid:string) => {
  const link = doc(APP_DB, 'settings', uid);
  const unsubscribe = onSnapshot(link, (doc) => {
    const data = doc.data() as Settings
    callBack(data);
  })
  return unsubscribe
}