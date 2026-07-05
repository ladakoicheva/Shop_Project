import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  name: 'Alex',
  id :1313
};

const counterSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
 
  },
});


// export const {  } =
//   counterSlice.actions;

export default counterSlice.reducer;



// const fun = (data) => {
//   return {
//     reducer: {
//       test : data
//     },
//     actions : [1,2,3]
//   }
// }


// const q = fun({ a: 1 })
// console.log(q.reducer.test.a)