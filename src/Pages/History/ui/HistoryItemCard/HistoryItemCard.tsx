import HistoryProductsList from '../HistoryProductsList'
import style from './HistoryItemCard.module.css'
import {  useNavigate } from 'react-router-dom'
import { addToHistoryArchive } from '../../../../redux/history/history';
import type { historyI } from '../../../../../types/types';
import type { userAuth } from '../../../../redux/auth/type';
import { useAppDispatch } from '../../../../redux/type';
import { ImageArchive } from '../../../../utils/Image';

type props = {
  purchase: historyI,
  user:userAuth
}

export default function HistoryItemCard({ purchase, user }: props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dateFormatted = new Date(purchase.date).toLocaleDateString('ru-RU');
  const totalItemsCount = purchase.products?.reduce((acc, item) => acc + (item.count || 1), 0) || purchase.products?.length || 0;

  return (
    <div className={style.card}>
      <div className={style.cardHeader}>
        <h3 className={style.dateTitle}>{dateFormatted}</h3>
        <span className={style.itemCountBadge}>{totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}</span>
      </div>

      <div className={style.cardBody}>
        <ul className={style.productList}>
          {purchase.products?.map((product) => (
            <HistoryProductsList key={product.id} product={product} />
          ))}
        </ul>
      </div>

      <div className={style.cardFooter}>
        <button
          className={style.archiveBtn}
          title="Archive order"
          onClick={() => dispatch(addToHistoryArchive({ uid: user?.uid!, purchaseID: purchase.id }))}
        >
          <ImageArchive className={style.archiveIcon} alt="archive icon" />
          <span>Archive</span>
        </button>

        <button
          className={style.detailsBtn}
          onClick={() => navigate(`/history/${purchase.id}`)}
        >
          <span>View Details</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

