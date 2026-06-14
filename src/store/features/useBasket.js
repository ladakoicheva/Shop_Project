import { useState,useEffect } from "react";
import { useStoreContext } from "../store";

export default function useBasket() {
  
  const { basket, setBasket } = useStoreContext();
 

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket))
  }, [basket])
  
  const addToBasket = (product) => {

    const copy = { ...basket }
    const id = product.id
    if (copy[id]) {
      copy[id].count++;
    } else {
      copy[id] = { product: product, count: 1 }
    }
    //! error sheme
    setBasket(copy)
  }

  const deleteFromBasket = (product) => {
    const copy = { ...basket }
    const id = product.id
    copy[id].count--
    if (copy[id].count === 0) delete copy[id];

    setBasket(copy)
  }



  return {
    basket,
    addToBasket,
    deleteFromBasket,
    setBasket,

  }
    
    
  
}


