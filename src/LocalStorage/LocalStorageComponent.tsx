import { useAppSelector } from '../redux/type';
import { useEffect } from 'react';
import { useAppDispatch } from '../redux/type';
import { updateRates } from '../redux/auth/auth';
// import { connectLiveSetting } from '../services/firebase/socket/setting';


export const LocalStorageComponent = () => {
  const basket = useAppSelector((s) => s.basket.data);
  const { currency } = useAppSelector((s) => s.auth.settings)
  const dispatch = useAppDispatch()
  // console.log(rates)
  
  
  
   useEffect(() => {
      localStorage.setItem('basket', JSON.stringify(basket))
   }, [basket])
  
  useEffect(() => {
     const getRates = async () => {
      try {
        const res = await fetch(`https://open.er-api.com/v6/latest/${currency}`);
        const data = await res.json();
        if (res.ok) {
          const ratesObj = {
            UAH: data.rates.UAH,
            USD: data.rates.USD,
          }
          dispatch(updateRates(ratesObj))
        }
        } catch (e) {
          console.log(e)
        }
    
      }
        getRates();
        
  
  }, []) 
  

//     useEffect(() => {
//       if (!user ) return;
  
//       const callBack = (data:settingsI) => {
//         dispatch(updateStyles(data));
//       }
//       const unsubscribe = connectLiveSetting(callBack, user.uid!);
//       return unsubscribe
  
//     }, [user])
  
    
  return null;
}
