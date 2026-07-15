import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/type"
import { getAllFavProducts } from "../services/firebase/db/favProducts";
import { changeFav } from "../redux/fav/fav";





export default function FavSync() {

  const { user } = useAppSelector((s) => s.auth);
  const { isLoading } = useAppSelector((s) => s.loading)
  const dispatch = useAppDispatch();

    useEffect(() => {
  
      if (user?.uid && !isLoading ) {
  
  
        const getFav = async () => {
          const res = await getAllFavProducts(user?.uid!)
          const data = res.data as string[]
          if (res.ok) dispatch(changeFav(data))
        }
        getFav()
      }
      return () => {
        dispatch(changeFav([]))
      };
  
    }, [user?.uid, isLoading])
  return null
}
