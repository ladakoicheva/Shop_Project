import { createContext, useCallback, useContext } from "react";
import { removeProduct, editProduct } from "../../services/firebase/db/products";
import { useState } from "react";

export const ProductContext = createContext({});


export default function useProductManager({ user, basket}) {
  
  const [products, setProducts] = useState([]);

  const setProductsData = useCallback((data, currentUID) => {
    //! old user 
    if (!user) return;
    const uid = user.uid;
    if (currentUID === uid) setProducts(data);
  },[user])

  const deleteProduct = async (product, uid, id) => {
    const res = await removeProduct(product, uid, id);
    const copy = { ...basket }
    if (res.ok) {
     
      if (copy[id]) {
        delete copy[id];
        basket.updateBasketEditProduct(copy);
      }
      const filtered = products.filter((el) => el.id !== id);

      setProducts(filtered);
    }

  }

  const editProductData = async (uid, id, newData, file) => {
    const res = await editProduct(uid, id, newData, file);


    if (res.ok) {
      const copy = [...products]
      const basketCopy = { ...basket };
      const index = copy.findIndex((el) => el.id == id);
      copy[index] = { ...copy[index], ...res.data };

      if (basketCopy[id]) {
        basketCopy[id].product = { ...basketCopy[id].product, ...res.data };
        basket.updateBasketEditProduct(basketCopy)
      }

      setProducts(copy)

      return res.data
    }


  }
  return {
    products,
    deleteProduct,
    editProductData,
    setProductsData
  }
}

export const useProductContext = ()=>useContext(ProductContext)