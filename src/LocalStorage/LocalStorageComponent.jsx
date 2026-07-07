import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { changeUser } from '../redux/auth/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { finishLoadingApp } from '../redux/loading/loading';
import { APP_AUTH } from '../services/firebase';
import { connectLiveSetting } from '../services/firebase/socket/setting';
import { updateStyles } from '../redux/auth/auth';

export const LocalStorageComponent = () => {
  const basket = useSelector((s) => s.basket.data);
  const {user} = useSelector((s)=>s.auth)
  const dispatch = useDispatch();

  
   useEffect(() => {
      localStorage.setItem('basket', JSON.stringify(basket))
   }, [basket])
  
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(APP_AUTH, (user) => {
  
  
        if (user) {
  
          const userData = {
            uid: user.uid,
            email: user.email,
          };
          dispatch(changeUser(userData))
  
        } else {
          dispatch(changeUser(null))
        }
        dispatch(finishLoadingApp());
      })
      return unsubscribe;
  
  }, [])
  
    useEffect(() => {
      if (!user) return;
  
      const callBack = (data) => {
        dispatch(updateStyles(data));
      }
      const unsubscribe = connectLiveSetting(callBack, user.uid);
      return unsubscribe
  
    }, [user])
  
    
  return null;
}
