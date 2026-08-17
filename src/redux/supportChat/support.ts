import { createAsyncThunk, createSlice,type PayloadAction  } from "@reduxjs/toolkit";
import type { stateI } from "./type";
import type { RootState } from "../store";
import { clientReadMessage } from "../../services/firebase/db/support";



const initialState:stateI = {
  isOpen: false,
  isincoming : false,
  // adminAnswerLoading:false,
  
}

const support = createSlice({
  name: 'support',
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true
    },
    closeModal(state) {
      state.isOpen = false
    },

    setIsIncoming(state) {
      state.isincoming = true
    },

     setNotIsIncoming(state) {
      state.isincoming = false
    },


   
  }
})

export const readMessage = createAsyncThunk(
  'support/readMessage'
  , async (_, { dispatch, getState }) => {
    const store: RootState = getState() as RootState;
    const userEmail = store.auth.user?.email as string;
    const res = await clientReadMessage(userEmail);
    if(res.ok) dispatch(setNotIsIncoming());
    
  
  
})

  // "1779261300000": {
  //     "message": "Привет! Подскажи статус по задаче?",
  //     "id": "a1b2",
  //     "is": false
  //   },
export const {
  openModal,
  closeModal,
  setIsIncoming,
  setNotIsIncoming,
  } = support.actions
export default support.reducer;