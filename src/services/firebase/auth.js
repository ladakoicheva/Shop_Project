import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { APP_AUTH } from ".";

export const onRegistartionApi = async (email, password) => {
  try {
    const data = await createUserWithEmailAndPassword(
      APP_AUTH,
      email,
      password
    );
    return { ok: true, data: data.user }
  } catch (error) {
    return { ok: false, message: error.message, code: error.code }
  }
}


// signInWithEmailAndPassword
export const onLoginApi = async (email, password) => {
  try {
    const data = await signInWithEmailAndPassword(
      APP_AUTH,
      email,
      password
    )
    return { ok: true, data: data.user }
  } catch (error) {
   
    return { ok: false, message: error.message, code: error.code }
  }
}



