import { addProductToFav, deleteProductFromFav, getAllFavProducts } from "../../services/firebase/db/favProducts";
import { useStoreContext } from "../store";


export default function useFav() {

  const { favorites, setFavorites, user } = useStoreContext();

  const addToFav = async (ownersUid, productId) => {

    const res = await addProductToFav(user.uid, ownersUid, productId)
    console.log(user.uid, ownersUid, productId)
    if (res.ok) {
      favorites.push(productId)
      console.log(favorites)

      setFavorites([...favorites]);
    } else {
      console.log(res.text)
    }



  }
  const deleteItemFromFav = async (ownersUid, productId) => {

    const res = await deleteProductFromFav(user.uid, ownersUid, productId)
   
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
