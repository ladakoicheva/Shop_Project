import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getHistoryItem } from '../../../services/firebase/db/history';
import { Autorisation_HOC } from '../../../HOC/Autorisation_HOC';
import './HistoryItemPage.css';
import { getBasketFormHistory } from '../../../redux/basket/basket';
import { useAppDispatch, useAppSelector } from '../../../redux/type';
import type { basketI, historyI, productI } from '../../../../types/types';
import { convector } from '../../../utils/convector';

export function HistoryItemPage() {
  const [currentItem, setCurrentItem] = useState<historyI | null>(null);
  const { id } = useParams();
  const { user, settings, rates } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const repeatPurchase = () => {
    if (!currentItem) return;

    const productsData = currentItem.products.reduce((acc: basketI, product: productI) => {
      acc[product.id] = { count: product.count!, product: product };
      return acc;
    }, {});

    dispatch(getBasketFormHistory(productsData));
    navigate('/basket');
  };

  useEffect(() => {
    if (!user) return;
    const getCurrentItem = async () => {
      const res = await getHistoryItem(user.uid!, id!);
      if (res.ok && res.data) setCurrentItem(res.data);
    };

    getCurrentItem();
  }, [user, id]);

  if (!currentItem) {
    return (
      <div className="historyContainer" style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#64748b' }}>
          Загрузка деталей заказа...
        </p>
      </div>
    );
  }

  return (
    <div className="historyContainer">
      <div className="headerRow">
        <button className="backBtn" onClick={() => navigate(-1)}>
          <span>← Назад к истории</span>
        </button>

        <h2 className="historyDate">
          Заказ от {new Date(currentItem.date).toLocaleDateString('ru-RU')}
        </h2>
      </div>

      <ul className="productList">
        {currentItem.products?.map((el) => {
          const convertedPrice = convector(
            settings.currency || 'USD',
            el.currency || 'USD',
            el.price,
            rates
          );

          return (
            <li className="productItem" key={el.id}>
              <div className="productImg">
                <img src={el.img || '/No-Image.svg.png'} alt={el.name} />
              </div>

              <div className="productInfo">
                <span className="productName">{el.name}</span>
                <span className="productCount">{el.count} шт.</span>
              </div>

              <div className="productPrice">
                {convertedPrice} {settings?.currency || 'USD'}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="purchaseResume">
        <div className="historyTotal">
          Итого: {currentItem.totalSum} {settings?.currency || 'USD'}
        </div>

        <button className="repeatBtn" onClick={repeatPurchase}>
          <span>⚡ Повторить заказ</span>
        </button>
      </div>
    </div>
  );
}

const HistoryCurrentItemPage = Autorisation_HOC(HistoryItemPage);
export default HistoryCurrentItemPage;