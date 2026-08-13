import { createSlice,type PayloadAction  } from "@reduxjs/toolkit";
import type { stateI } from "./type";



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