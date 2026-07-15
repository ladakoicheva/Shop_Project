// saveUser.js
import type { ResponseI } from "../../../../types/types";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { APP_DB } from "..";
import type { Settings } from "../../../redux/auth/type";

export const changeSettings = async (uid:string, data:Partial<Settings>):Promise<ResponseI<null>> => {

  try {
    const docLink = doc(APP_DB, "settings", uid)
    await setDoc(docLink, data, { merge: true });
    return { ok: true, data: null }
  
  } catch (e) {
    const error = e as string;
    return { ok: false, e: error }
  }
}

//{}
export const getSettings = async (uid:string):Promise<ResponseI<Settings|null>> => {
  try {
   
    const docLink = doc(APP_DB, "settings", uid)
    const response = await getDoc(docLink);
    const data = response.data() as Settings;
    return { ok: true, data }
  } catch (e) {
     const error = e as string;
    return { ok: false, data: null, e: error }

  }
}
