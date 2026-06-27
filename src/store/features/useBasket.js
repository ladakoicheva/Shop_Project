import { useState, useEffect, useContext } from "react";
import { createContext } from "react";

export const BasketContext = createContext({

})

export default function useBasket() {

  const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket')) || {}); // {} 

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket))
  }, [basket])


 
  const addToBasket = (product) => {
    const id = product.id

    setBasket((prev) => {
      const copy = { ...prev }

      if (copy[id]) {
        copy[id] = { ...copy[id], count: copy[id].count + 1 }
      } else {
        copy[id] = { product: product, count: 1 }
      }

      return copy
    })
  }

  const getBasketFormHistory = (data) => {
    setBasket({ ...data, ...basket })
  }

  const updateBasketEditProduct = (data) => {
    setBasket(data);
  }

  const deleteFromBasket = (product) => {
    const copy = { ...basket }
    const id = product.id
    copy[id].count--
    if (copy[id].count === 0) delete copy[id];

    setBasket(copy)
  }

  const resetBasket = () => {
    setBasket({});
  }


  return {
    basket,
    addToBasket,
    deleteFromBasket,
    getBasketFormHistory,
    resetBasket,
    updateBasketEditProduct,

  }



}

export const useBasketContext = () => useContext(BasketContext)

