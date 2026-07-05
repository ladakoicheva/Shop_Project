import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  name: 'Lada',
  id: 1314
};

const slice = createSlice(
  {
    name: 'test2',
    initialState,
    reducers: {

    }
  }
)
export default slice.reducer