import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  isLoadingApp: true,
};

const loading = createSlice(
  {
    name: 'loading',
    initialState,
    reducers: {
      closeLoading(state) {
        state.isLoading = false
      },
      openLoading(state) {
        state.isLoading = true
      },
      finishLoadingApp(state) {
        state.isLoadingApp = false
      }
    }
  }
)

export default loading.reducer;
export const { closeLoading, openLoading,finishLoadingApp } = loading.actions;


