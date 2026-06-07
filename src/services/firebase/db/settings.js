// saveUser.js

import { doc, getDoc, setDoc } from "firebase/firestore";

import { APP_DB } from "..";

export const changeSettings = async (uid, data)=> {
  try {
    const docLink = doc(APP_DB, "settings", uid)
    await setDoc(docLink, data);
    
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document:", error);
  }
}
export const getSettings = async (uid) =>{
  try {
    console.log(uid)
    const docLink = doc(APP_DB, "settings", uid)
    const response = await getDoc(docLink);
    const data = response.data();
    return data
  } catch (error) {
    console.error("Error :", error);
  }
}
