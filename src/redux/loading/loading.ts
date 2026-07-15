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
      closeLoadingApp(state) {
        state.isLoadingApp = false
      },
      openLoadingApp(state) {
        state.isLoadingApp = true
      },
    }
  }
)

export default loading.reducer;
export const { closeLoading, openLoading,closeLoadingApp,openLoadingApp } = loading.actions;


