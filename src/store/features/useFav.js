import { createContext, useContext } from "react";
import { addProductToFav, deleteProductFromFav, getAllFavProducts } from "../../services/firebase/db/favProducts";
import { useAuthContext } from "./useAuth";
import { useState } from "react";
import { useEffect } from "react";


export const FavContext = createContext({})


export default function useFav({ user, isLoading }) {


  const [favorites, setFavorites] = useState([]);
  
 

  useEffect(() => {


    if (user && !isLoading) {

    
      const getFav = async () => {
        const res = await getAllFavProducts(user.uid)
        if (res.ok) setFavorites(res.data)
      }
      getFav()
    } else {
      setFavorites([]);
    }

  }, [user,isLoading])

  const addToFav = async (ownersUid, productId) => {
    if (!user) return

    const res = await addProductToFav(user.uid, ownersUid, productId)
  
    if (res.ok) {
      favorites.push(productId)
      console.log(favorites)

      setFavorites([...favorites]);
    } else {
      console.log(res.text)
    }



  }
  const deleteItemFromFav = async (ownersUid, productId) => {

    if (!user) return
    const res = await deleteProductFromFav(user?.uid, ownersUid, productId)

    if (res.ok) {
      const copy = [...favorites]
      const index = copy.indexOf(productId)
      if (index !== -1) {
        copy.splice(index, 1);
        setFavorites(copy);
      }

    } else {
      console.log(res.text);
    }

  }
  return {
    favorites,
    deleteItemFromFav,
    addToFav,

  }
}


export const useFavContext = ()=>useContext(FavContext)
