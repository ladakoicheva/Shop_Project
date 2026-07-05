import { createContext, useCallback, useContext } from "react";
import { useState } from "react";

export const ProductContext = createContext({});


export default function useProductManager({ user }) {

  const [products, setProducts] = useState([]);

  const setProductsData = useCallback((data, currentUID) => {
    //! old user 
    if (!user) return;
    const uid = user.uid;
    if (currentUID === uid) setProducts(data);
  }, [user])






  return {
    products,
    setProductsData
  }

}
export const useProductContext = () => useContext(ProductContext)