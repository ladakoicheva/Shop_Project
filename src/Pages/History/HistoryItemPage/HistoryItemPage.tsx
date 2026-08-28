import {  useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getHistoryItem } from '../../../services/firebase/db/history';
import { Autorisation_HOC } from '../../../HOC/Autorisation_HOC';
import './HistoryItemPage.css';
import { getBasketFormHistory } from '../../../redux/basket/basket';
import { useAppDispatch, useAppSelector } from '../../../redux/type';
import type { basketI, historyI,productI } from '../../../../types/types';
import { ImageProduct, ImageRedo } from '../../../utils/Image';

export function HistoryItemPage() {
  const [currentItem, setCurrentItem] = useState<historyI|null>(null);
  const { id } = useParams();
  const {user} = useAppSelector((s)=>s.auth)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const repeatPurchase = () => {
    if(!currentItem)return
   
    const productsData = currentItem.products.reduce((acc:basketI, product:productI) => {
      acc[product.id] = { count: product.count!, product:product}
      return acc;
    }, {});

    dispatch(getBasketFormHistory(productsData));
    navigate('/basket');
  }

  useEffect(() => {
    if(!user)return
    const getCurrentItem = async () => {
      const res = await getHistoryItem(user.uid!, id!)
      if (res.ok) setCurrentItem(res.data!)
    }

    getCurrentItem()
  }, [user?.uid, id])

  if (!currentItem) return <div className='history-loading'>Loading order details...</div>;

  return (
    <div className='history-container'>
      <div className='history-header-bar'>
        <Link to="/history" className='backLink'>
          <span>←</span> History
        </Link>
        <h2 className='history-date'>Order Details ({new Date(currentItem.date).toLocaleDateString('ru-RU')})</h2>
      </div>

      <ul className='productList'>
        {currentItem.products?.map((el) => (
          <li className='product-item' key={el.id}>
            <div className='productImg'>
              <ImageProduct src={el.img} alt={el.name} />
            </div>

            <div className='product-info'>
              <span className='product-name'>{el.name}</span>
              <span className='product-count'>{el.count || 1} {el.count === 1 ? 'item' : 'items'}</span>
            </div>

            <div className='product-price'>
              {el.price} {el.currency || 'UAH'}
            </div>
          </li>
        ))}
      </ul>

      <div className='purchase-resume'>
        <button className='repeatBtn' onClick={repeatPurchase} title="Repeat this order">
          <ImageRedo className='redoIcon' alt="repeat purchase" />
          <span>Repeat Order</span>
        </button>

        <div className='history-total-group'>
          <span className='total-label'>Total Amount:</span>
          <h3 className='history-total'>{currentItem.totalSum.toLocaleString()} UAH</h3>
        </div>
      </div>
    </div>
  );
}



const HistoryCurrentItemPage = Autorisation_HOC(HistoryItemPage)

export default HistoryCurrentItemPage