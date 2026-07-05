import { createContext, useContext } from "react";
import { addProductToFav, deleteProductFromFav, getAllFavProducts } from "../../services/firebase/db/favProducts";
import { useState } from "react";
import { useEffect } from "react";


export const FavContext = createContext({})


export default function useFav({ auth }) {


  const [favorites, setFavorites] = useState([]);



  useEffect(() => {

    if (auth.user?.uid && !auth.isLoading ) {


      const getFav = async () => {
        const res = await getAllFavProducts(auth.user.uid)
        if (res.ok) setFavorites(res.data)
      }
      getFav()
    }
    return () => {
      setFavorites([]);
    };

  }, [auth.user?.uid, auth.isLoading])

  const addToFav = async (ownersUid, productId) => {
    if (!auth.user.uid) return

    const res = await addProductToFav(auth.user.uid, ownersUid, productId)

    if (res.ok) {
      favorites.push(productId)

      setFavorites([...favorites]);
    }



  }
  const deleteItemFromFav = async (ownersUid, productId) => {

    if (!auth.user.uid) return
    const res = await deleteProductFromFav(auth.user.uid, ownersUid, productId)

    if (res.ok) {
      const copy = [...favorites]
      const index = copy.indexOf(productId)
      if (index !== -1) {
        copy.splice(index, 1);
        setFavorites(copy);
      }

    }
  }
  return {
    favorites,
    deleteItemFromFav,
    addToFav,

  }
}


export const useFavContext = () => useContext(FavContext)
