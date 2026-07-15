import { useAppSelector } from '../redux/type';
import { useEffect } from 'react';
import { connectToApp } from '../redux/think'
import { useAppDispatch } from '../redux/type';
export const LocalStorageComponent = () => {
  const basket = useAppSelector((s) => s.basket.data);
  const dispatch = useAppDispatch()

  
   useEffect(() => {
      localStorage.setItem('basket', JSON.stringify(basket))
   }, [basket])
  
  useEffect(() => {
    dispatch(connectToApp())
  }, []) //! autorisation user ...
  

  
    // useEffect(() => {
    //   if (!user) return;
  
    //   const callBack = (data:settingsI) => {
    //     dispatch(updateStyles(data));
    //   }
    //   const unsubscribe = connectLiveSetting(callBack, user.uid);
    //   return unsubscribe
  
    // }, [user])
  
    
  return null;
}
