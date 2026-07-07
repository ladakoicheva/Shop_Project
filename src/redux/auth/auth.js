import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TYPE_MODAL } from "../../Components/Forms/typeModeHelper";
import { onLoginApi, onRegistartionApi } from "../../services/firebase/auth";
import { signOut } from "firebase/auth";
import { APP_AUTH } from "../../services/firebase";

const initialState = {
  user: null,
  authMode: TYPE_MODAL.SING_UP,
  settings: {
    bgbg: "rgba(255,255,255)",
    name: "shop",
    namecolor: "rgba(255,242,242)",
    namefontSize: "30",
    pricecolor: "black",
    pricefontSize: "24"
  }
}
const auth = createSlice(
  {
    name: 'auth',
    initialState,
    reducers: {
      changeUser(state, action) {
        state.user = action.payload;
      },
      changeAuthMode(state, action) {
        state.authMode = action.payload;
      },
      updateStyles(state, action) {
        state.settings = { ...state.settings, ...action.payload }

      }
    }
  }
)




export const onLogin = createAsyncThunk(
  "auth/onLogin",
  async ({ email, password }, { dispatch }) => {
    const userData = await onLoginApi(email, password);
    console.log(userData);
    if (userData.ok) {
      const user = { email: userData.data.email, uid: userData.data.uid }
      dispatch(changeUser(user))
    }
    return { ok: userData.ok, code: userData.code }
  }
);

export const onRegistration = createAsyncThunk(
  'auth/onRegistration',
  async ({ email, password }, { dispatch }) => {
    const userData = await onRegistartionApi(email, password);
    if (userData.ok) {
      const user = { email: userData.data.email, uid: userData.data.uid }
      dispatch(changeUser(user))
    }
    return { ok: userData.ok, code: userData.code }
  }
)


export const logOut = createAsyncThunk(
  'auth/onSignOut',
  async (_, { dispatch }) => {
    try {
      await signOut(APP_AUTH);
      dispatch(changeUser(null));
      return { ok: true };

    } catch (err) {
      return { ok: false, data: null, message: err.message };
    }
  })





export default auth.reducer
export const { changeUser, changeAuthMode, updateStyles } = auth.actions