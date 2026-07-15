import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { APP_AUTH } from "./index";
import type { ResponseI } from "../../../types/types";
import type { userI } from "../../redux/auth/type";

export const onRegistartionApi = async (email: string, password:string):Promise<ResponseI<userI >> => {
  try {
    const data = await createUserWithEmailAndPassword(
      APP_AUTH,
      email,
      password
    );
    console.log(data)
    return { ok: true, data: { email: data.user.email||""   , uid:data.user.uid} }
  } catch (error : any) {
    const code = error.code as string
    return { ok: false, code}
  }
}


// signInWithEmailAndPassword
export const onLoginApi = async (email:string, password:string):Promise<ResponseI<userI >> => {
  try {
    const data = await signInWithEmailAndPassword(
      APP_AUTH,
      email,
      password
    )
    return { ok: true,  data:{email:data.user.email||"", uid:data.user.uid}  }
  } catch (error:any) {
    const code = error.code as string;
    return { ok: false,  code }
  }
}



