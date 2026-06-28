// saveUser.js

import { doc, getDoc, setDoc } from "firebase/firestore";

import { APP_DB } from "..";

export const changeSettings = async (uid, data) => {

  try {
    const docLink = doc(APP_DB, "settings", uid)
    await setDoc(docLink, data, { merge: true });

  
  } catch (error) {
    console.error("Error writing document:", error);
  }
}

//{}
export const getSettings = async (uid) => {
  try {
   
    const docLink = doc(APP_DB, "settings", uid)
    const response = await getDoc(docLink);
    const data = response.data();
    return { ok: true, data }
  } catch (error) {
    return { ok: false, data: null, e: error }

  }
}
