import {  useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { getHistoryItem } from '../../../services/firebase/db/history';
import { Autorisation_HOC } from '../../../HOC/Autorisation_HOC';
import './HistoryItemPage.css';
import { useBasketContext } from '../../../store/features/useBasket';


export function HistoryItemPage({auth}) {
  const [currentItem, setCurrentItem] = useState(null);
  const { id } = useParams();
  const {user} = auth
  const {   getBasketFormHistory } = useBasketContext()
  const navigate = useNavigate();

  console.log(currentItem)

  const repeatPurchase = () => {
   
    const productsData = currentItem.products.reduce((acc, product) => {

      acc[product.id] = { count: product.count, product }
      return acc;
    }, {});

    getBasketFormHistory(productsData)

    navigate('/basket');
  }


  useEffect(() => {
    const getCurrentItem = async () => {
      const res = await getHistoryItem(user.uid, id)
      if (res.ok) setCurrentItem(res.data)
    }

    getCurrentItem()
  }, [user.uid, id])

  if (!currentItem) return <div>Loading...</div>
  return (

    <div className='history-container'>
      <h2 className='history-date'>{new Date(currentItem.date).toLocaleDateString('ru-RU')}</h2>

      <ul className='productList'>
        {currentItem.products?.map((el) => (

          <li className='product-item' key={el.id}>
            <div className='productImg'>
              <img src={el.img} alt={el.name} />
            </div>

            <div className='product-info'>
              <span className='product-name'>{el.name}</span>
              <span className='product-count'> {el.count} items</span>
            </div>

            <div className='product-price'>
              {el.price} {el.currency}
            </div>
          </li>


        ))}
      </ul>
      <div className='purchase-resume'> <img className='redoIcon' onClick={repeatPurchase} src="/free-icon-redo.png" alt="redoIcon" />
        <h3 className='history-total'>Total: {currentItem.totalSum}</h3></div>

    </div>


  )
}

const HistoryCurrentItemPage = Autorisation_HOC(HistoryItemPage)

export default HistoryCurrentItemPage