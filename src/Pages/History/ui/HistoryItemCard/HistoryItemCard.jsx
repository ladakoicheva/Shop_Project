import React from 'react'
import HistoryProductsList from '../HistoryProductsList'
import style from './HistoryItemCard.module.css'
import { Link, useNavigate } from 'react-router-dom'



export default function HistoryItemCard({ purchase }) {
  const navigate = useNavigate();
  return (
    <div className={style.card}>
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
