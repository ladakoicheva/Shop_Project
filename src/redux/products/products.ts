import {  createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { productI } from "../../../types/types";
import type { userAuth} from "../auth/type";
import type { productsStateI } from "./type";

const initialState:productsStateI = {
  products: []
};

const products = createSlice(
  {
    name: 'products',
    initialState,
    reducers: {
      setProductsData(state, action:PayloadAction<{currentUID:string, user:userAuth, data:productI}>) {
        const { currentUID, user, data } = action.payload;
        //! old user 
        if (!user) return;
        const uid = user.uid;
        if (currentUID === uid) state.products = [...state.products, data]
      },
      editProduct(state, action:PayloadAction<{currentUID:string, user:userAuth, data:productI}>) {
        const { currentUID, user, data } = action.payload;
        if (!user) return;
        const uid = user.uid;
        if (currentUID === uid) {
          const index = state.products.findIndex((el) => el.id == data.id);
          state.products[index] = { ...state.products[index], ...data };
        }
      },
      deleteProduct(state, action:PayloadAction<{currentUID:string, user:userAuth, data:productI}>) {
        const { currentUID, user, data } = action.payload;
        if (!user) return;
        const uid = user.uid;
        if (currentUID === uid) state.products = state.products.filter((el) => el.id !== data.id)
      }

    }
  }
)


export const { setProductsData, editProduct, deleteProduct } = products.actions

export default products.reducer