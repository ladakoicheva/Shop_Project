import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { APP_DB } from "..";



export const saveHistory = async (data, uid) => {
  const id = uuidv4();
  try {
    const docLink = doc(APP_DB, "user", uid, 'history',id);
    await setDoc(docLink, data, { merge: true });
    return { ok: true, data: data }

  } catch (error) {
    return { ok: false, data: null,e:error }
  }
}
