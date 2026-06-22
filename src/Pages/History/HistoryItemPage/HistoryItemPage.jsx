import { useMemo, useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { getHistoryItem } from '../../../services/firebase/db/history';
import { useStoreContext } from '../../../store/store';
import { Autorisation_HOC } from '../../../HOC/Autorisation_HOC';
import './HistoryItemPage.css';

function HistoryItemPage() {
  const [currentItem, setCurrentItem] = useState(null);
  const store = useStoreContext()
  const { id } = useParams();



  useEffect(() => {
    const getCurrentItem = async () => {
      const res = await getHistoryItem(store.user.uid, id)
      if (res.ok) setCurrentItem(res.data)


    }

    getCurrentItem()
  }, [store.user.uid, id])

  if (!currentItem) return <div>Loading...</div>
  return (

    <div className='history-container'>
      <h2 className='history-date'>{new Date(currentItem.date).toLocaleDateString('ru-RU')}</h2>

      <ul className='productList'>
        {currentItem.products?.map((el, index) => (

          <li className='product-item' key={el.id }>
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
      <h3 className='history-total'>Total: {currentItem.totalSum}</h3>
    </div>


  )
}

export default Autorisation_HOC(HistoryItemPage)
