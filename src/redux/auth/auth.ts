import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { TYPE_MODAL } from "../../Components/Forms/typeModeHelper";
import { onLoginApi, onRegistartionApi } from "../../services/firebase/auth";
import { signOut } from "firebase/auth";
import { APP_AUTH } from "../../services/firebase";
import type { AuthState, Settings, typeModalT, userAuth, userI} from "./type";
import type { AppDispatch } from "../store";
import type { ResponseI } from "../../../types/types";

const initialState : AuthState = {
  user: null,
  authMode: TYPE_MODAL.SIGN_UP,
  settings: {
    bgbg: "rgba(255,255,255)",
    name: "shop",
    namecolor: "rgba(255,242,242)",
    namefontSize: "30",
    pricecolor: "black",
    pricefontSize: "24",
    currency:"UAH"
  }
}
const auth = createSlice(
  {
    name: 'auth',
    initialState,
    reducers: {
      changeUser(state, action : PayloadAction<userAuth>) {
        state.user = action.payload;
      },
      changeAuthMode(state, action : PayloadAction<typeModalT>) {
        state.authMode = action.payload;
      },
      updateStyles(state, action : PayloadAction<Partial<Settings>>) {
        state.settings = { ...state.settings, ...action.payload }

      }
    }
  }
)



export const onLogin = createAsyncThunk<
  ResponseI<any>,
  userI,
  { dispatch: AppDispatch }
>(
  
  "auth/onLogin",
  async ({ email, password }, { dispatch }) => {
    const userData = await onLoginApi(email, password!);
    if (userData.ok && userData.data) {
      const user = { email: userData.data.email, uid: userData.data.uid }
      dispatch(changeUser(user))
    }
    return { ok: userData.ok, code: userData.code }
  }
);

export const onRegistration = createAsyncThunk<
  ResponseI<any>,
  userI,
  { dispatch: AppDispatch }
>(

  'auth/onRegistration',
  async ({ email, password }, { dispatch }) => {
    const userData = await onRegistartionApi(email, password!);
    if (userData.ok && userData.data) {
      const user = { email: userData.data.email, uid: userData.data.uid }
      dispatch(changeUser(user))
    }
    return { ok: userData.ok, code: userData.code }
  }
)


export const logOut = createAsyncThunk<
  ResponseI<null>,
  void,
  { dispatch: AppDispatch }
>(
  'auth/onSignOut',
  async (_, { dispatch }) => {
    try {
      await signOut(APP_AUTH);
      dispatch(changeUser(null));
      return { ok: true };

    }
    catch (err) {
      if(err instanceof Error)  return { ok: false, data: null, message: err.message };
    }
    return { ok: false, data: null, message: 'unknown error'};
  })





export default auth.reducer
export const { changeUser, changeAuthMode, updateStyles } = auth.actions