import { createSlice,type PayloadAction  } from "@reduxjs/toolkit";
import type { stateI } from "./type";



const initialState:stateI = {
  isOpen: false,
  isincoming : false,
  adminAnswerLoading:false,
  
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
    openAdminLoading(state) {
      state.adminAnswerLoading = true
    },
    closeAdminLoading(state) {
      state.adminAnswerLoading = false
    },


   
  }
})

  // "1779261300000": {
  //     "message": "Привет! Подскажи статус по задаче?",
  //     "id": "a1b2",
  //     "is": false
  //   },
export const { openModal, closeModal,   openAdminLoading, closeAdminLoading
  } = support.actions
export default support.reducer;