import HistoryProductsList from '../HistoryProductsList'
import style from './HistoryItemCard.module.css'
import {  useNavigate } from 'react-router-dom'
import { addToHistoryArchive } from '../../../../redux/history/history';
import type { historyI } from '../../../../../types/types';
import type { userAuth } from '../../../../redux/auth/type';
import { useAppDispatch } from '../../../../redux/type';

type props = {
  purchase: historyI,
  user:userAuth
}

export default function HistoryItemCard({ purchase, user }:props) {
  //purchase.products =[{..},{...}..]
  const dispatch = useAppDispatch()

  const navigate = useNavigate();
  return (
    <div className={style.card}>
      <img onClick={() => dispatch(addToHistoryArchive({ uid: user?.uid!, purchaseID: purchase.id }))} className={style.archive} src="/free-icon-archive.png" alt="icon" />
      <span onClick={() => navigate(`/history/${purchase.id}`)} className={style.arrow}>⭢</span>
      <h3>{new Date(purchase.date).toLocaleDateString('ru-RU')}</h3>

      <ul>
        {purchase.products.map((product) => (
          <HistoryProductsList key={product.id} product={product} />
        ))}
      </ul>

    </div>
  )
}
