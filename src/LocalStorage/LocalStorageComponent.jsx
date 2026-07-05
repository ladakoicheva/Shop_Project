import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const LocalStorageComponent = () => {
  const basket = useSelector((s) => s.basket.data)
   useEffect(() => {
      localStorage.setItem('basket', JSON.stringify(basket))
    }, [basket])
  
  return null;
}
