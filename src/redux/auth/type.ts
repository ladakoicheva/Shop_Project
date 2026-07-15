
export interface userI {
  email: string 
  uid?: string
  password?:string
}

export type userAuth = userI | null


export interface Settings {
  bgbg: string;
  name: string;
  namecolor: string;
  namefontSize: string;
  pricecolor: string;
  pricefontSize: string;
  currency:string
}


export  enum MODAL_ENUM{
  singUpTxt = 'Sign up',
  singUpType = 'SIGN_UP',
  singInText = 'Sign in',
  singInType = 'SIGN_IN'
}


export interface  SING_UP_I {
  text: MODAL_ENUM.singUpTxt,
  type: MODAL_ENUM.singUpType
}

export interface SING_IN_I {
    text: MODAL_ENUM.singInText,
    type: MODAL_ENUM.singInType
   
}



export type typeModalT = SING_IN_I | SING_UP_I


// interface AuthData {
//   email: string;
//   password: string;
// }

export interface AuthResponse {
  ok: boolean;
  code?: string
 
}

// interface LogoutResponse {
//   ok: boolean;
//   data?: null;
//   message?: string;
// }

export interface AuthState {
  user: userAuth;
  authMode: typeModalT;
  settings: Settings;
}