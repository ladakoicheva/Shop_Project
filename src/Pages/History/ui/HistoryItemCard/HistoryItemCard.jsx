import React, { useMemo } from 'react'
import HistoryProductsList from '../HistoryProductsList'
import style from './HistoryItemCard.module.css'
import { Link, useNavigate } from 'react-router-dom'




export default function HistoryItemCard({ purchase, user, addToArchive }) {
  //purchase.products =[{..},{...}..]


  const navigate = useNavigate();
  return (
    <div className={style.card}>
      <img onClick={() => addToArchive( purchase.id)} className={style.archive} src="/free-icon-archive.png" alt="icon" />
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
