import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: JSON.parse(localStorage.getItem('basket')) || {} };
const basketSlice = createSlice({
  name: 'basket',
  initialState: initialState,
  reducers: {
    updateBasketEditProduct(state, action) {
      state.data = action.payload
    },
    getBasketFormHistory(state, action) {
      state.data = { ...state.data, ...action.payload }
    },
    addToBasket(state, action) {
      const order = action.payload;
      const id = order.id;
      const lastOrder = state.data[id];


      if (lastOrder) {
        state.data[id].count++;
      } else {
        state.data[id] = { product: order, count: 1 }
      }
    },


  resetBasket(state) {
    state.data = {}
  },
  deleteFromBasket(state, action) {
    const id = action.payload.id
    const productInBasket = state.data[id]
    // const copy = { ...basket }
   
    if (!productInBasket) return;
    productInBasket.count--
    if (productInBasket.count === 0) delete state.data[id];

  
}  },
})


export const { updateBasketEditProduct, getBasketFormHistory, addToBasket, resetBasket, deleteFromBasket } = basketSlice.actions;

export default basketSlice.reducer;






// const addToBasket = (product) => {
//   const id = product.id

//   setBasket((prev) => {
//     const copy = { ...prev }

//     if (copy[id]) {
//       copy[id] = { ...copy[id], count: copy[id].count + 1 }
//     } else {
//       copy[id] = { product: product, count: 1 }
//     }

//     return copy
//   })
// }



// const deleteFromBasket = (product) => {
//   console.log(product);
//   const copy = { ...basket }
//   const id = product.id
//   if (!copy[id]) return;
//   copy[id].count--
//   if (copy[id].count === 0) delete copy[id];

//   setBasket(copy)
// }

// const resetBasket = () => {
//   setBasket({});//
// }








// const pay = {
//   1: 'a',
//   2: 'r',
//   3: 't'
// }
// const bas = {
//   4: 'q',
//   3: 'v',
//   5: 'b'
// }



// const s = { ...bas, ...pay};

// const obj ={
//   1: 'a',
//   2: 'r',
//   4: 'q',
//   3: 'v',
//   5: 'b'
  
// }



// const getBasketFormHistory = (data) => {
//   setBasket({ ...data, ...basket })
// }
