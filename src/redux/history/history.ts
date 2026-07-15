import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { archieveItem } from "../../services/firebase/db/history";
import type { historyStateI } from "./type";
import type { historyI } from "../../../types/types";
import type { AppDispatch } from "../store";
import type { historyArchiveArgsI } from "./type"

const initialState:historyStateI = {
  history: [],
  total: 0,
};

const history = createSlice(
  {
    name: 'history',
    initialState,
    reducers: {
      archiveItem(state, action:PayloadAction<string>) {
       
        state.history = state.history.filter((purchase) => purchase.id !== action.payload);

      },
       getHistoryBasketUpdate(state,action:PayloadAction<historyI>) {
         state.history = [action.payload, ...state.history]
      },
      getHistoryPagination(state, action:PayloadAction<historyI[]>) {
        state.history = [...state.history, ...action.payload]
      },
      syncHistory(state, action:PayloadAction<historyI[]>) {
        state.history = action.payload
      },
      updateTotal(state, action:PayloadAction<number>) {
        state.total = action.payload
      }


    }
  }
)



export const addToHistoryArchive = createAsyncThunk <
  void,
  historyArchiveArgsI,
  { dispatch: AppDispatch}
  
  >(
  'history/addToHistoryArchive',
    async ({ uid, purchaseID }, { dispatch }) => {
    const res = await archieveItem(uid, purchaseID)
    if (res.ok) {
      dispatch(archiveItem(purchaseID));
    }
       
    }
  
)


export default history.reducer
export const { getHistoryPagination, updateTotal, syncHistory, archiveItem, getHistoryBasketUpdate } = history.actions