import type { favStateI } from "./type"
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AppDispatch } from "../store"
import type { favArgs } from "./type"
import { addProductToFav,deleteProductFromFav } from "../../services/firebase/db/favProducts"

const initialState:favStateI = {
  favorites:[]
}

const fav = createSlice(
  {
  name:'favorites',
    initialState,
    reducers: {
      changeFav(state,action:PayloadAction<string[]>) {
        state.favorites= action.payload
      },
      addItem(state,action:PayloadAction<string>) {
        state.favorites.push(action.payload) 
      },
      deleteItem(state,action:PayloadAction<string>) {
        state.favorites = state.favorites.filter((el)=>el!==action.payload)
      }
  }
  }
)

export const addToFav = createAsyncThunk
  <
    void,
    favArgs,
     { dispatch: AppDispatch}
  >(
    'fav/addToFav',
    async ({uid,ownersUid, productId},{dispatch}) => {
    if (!uid) return

    const res = await addProductToFav(uid, ownersUid, productId)

      if (res.ok) dispatch(addItem(productId))
    
  }
)

export const deleteItemFromFav = createAsyncThunk
  <
    void,
    favArgs,
     { dispatch: AppDispatch}
  >(
    'fav/deleteFromFav',
    async ({uid,ownersUid, productId},{dispatch}) => {
      if (!uid) return
      const res = await deleteProductFromFav(uid, ownersUid, productId)

    if (res.ok) dispatch(deleteItem(productId))

    
    }
)


    export default fav.reducer;
   export const { deleteItem,addItem,changeFav } = fav.actions;
