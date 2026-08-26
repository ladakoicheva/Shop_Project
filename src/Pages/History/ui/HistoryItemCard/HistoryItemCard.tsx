import HistoryProductsList from '../HistoryProductsList';
import style from './HistoryItemCard.module.css';
import { useNavigate } from 'react-router-dom';
import { addToHistoryArchive } from '../../../../redux/history/history';
import type { historyI } from '../../../../../types/types';
import type { userAuth } from '../../../../redux/auth/type';
import { useAppDispatch } from '../../../../redux/type';
import { TrashIcon } from '../../../../utils/svgIcons';

type props = {
  purchase: historyI;
  user: userAuth;
};

export default function HistoryItemCard({ purchase, user }: props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className={style.card}>
      <div className={style.cardHeader}>
        <div className={style.orderDate}>
          📅 {new Date(purchase.date).toLocaleDateString('ru-RU')}
        </div>

        <div className={style.cardActions}>
          {purchase.totalSum > 0 && (
            <span className={style.orderTotal}>{purchase.totalSum} UAH</span>
          )}

          <button
            className={`${style.actionBtn} ${style.archiveBtn}`}
            onClick={() =>
              dispatch(addToHistoryArchive({ uid: user?.uid!, purchaseID: purchase.id }))
            }
            title="Архивировать заказ"
          >
            <TrashIcon size={14} color="#f43f5e" />
            <span>В архив</span>
          </button>

          <button
            className={style.actionBtn}
            onClick={() => navigate(`/history/${purchase.id}`)}
            title="Детали заказа"
          >
            <span>Детали</span>
            <span>→</span>
          </button>
        </div>
      </div>

      <div className={style.productList}>
        {purchase.products.map((product) => (
          <HistoryProductsList key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
