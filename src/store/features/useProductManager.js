import { removeProduct, editProduct } from "../../services/firebase/db/products";
import { useStoreContext } from "../store";
import useBasket from "./useBasket";


export default function useProductManager() {
  const { products, setProducts, user } = useStoreContext();
  const { basket, setBasket } = useBasket();


  const setProductsData = (data, currentUID) => {
    //! old user 
    if (!user) return;
    const uid = user.uid;
    if (currentUID === uid) setProducts(data);
  }

  const deleteProduct = async (product, uid, id) => {
    const res = await removeProduct(product, uid, id);
    const copy = { ...basket }
    if (res.ok) {
      console.log(products)
      if (copy[id]) {
        delete copy[id];
        setBasket(copy);
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
        setBasket(basketCopy)
      }

      setProducts(copy)

      return res.data
    }


  }
  return {
    products,
    user,
    deleteProduct,
    editProductData,
    setProductsData
  }
}
