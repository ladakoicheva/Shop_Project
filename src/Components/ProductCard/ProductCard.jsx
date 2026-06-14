import React, { useEffect } from 'react'

import styles from './ProductCard.module.css'
import { getUANtoUSD } from '../../utils/convector'
import { Link, useParams } from 'react-router-dom'
import { useStoreContext } from '../../store/store'
import { useState } from 'react'
import { images } from '../../utils/images'
import { useMemo } from 'react'
import { getAllFavProducts } from '../../services/firebase/db/favProducts'
import useBasket from '../../store/features/useBasket'
import useAuth from '../../store/features/useAuth'
import useFav from '../../store/features/useFav'


export default function ProductCard({ product, onEdit, deleteItem, style }) {

  const { deleteProduct, cardStyle } = useStoreContext();
  const { addToBasket, deleteFromBasket, basket } = useBasket();
  const { user, isLoadingApp } = useAuth();
  const { deleteItemFromFav, addToFav, favorites } = useFav();

  const isInBasket = basket[product.id];
  const params = useParams();
  const isOwner = params.uid === user?.uid;

  // useState({
  //   name: ['black', '16'],
  //   price: ['black', '14'],
  //   bg: ['rgb(255, 255, 255)']
  // })


  const favorit = useMemo(() => {
    if (!user) return null



    const isInFav = favorites.includes(product.id);

    return {
      is: isInFav,
      src: isInFav ? images.star.on : images.star.off
    }

  }, [favorites, user, params.uid])

  const onFavClick = () => {
    !favorit.is ? addToFav(params.uid, product.id) : deleteItemFromFav(params.uid, product.id);
  }
  return (
    <>
      <article style={{ backgroundColor: style?.bgbg }} className={styles.productCard}   >

        <Link to={`product/${product.id}`}>
          <div className={styles.img} >
            <img src={product.img || '/No-Image.svg.png'} alt="" />
            <span className={styles.inStockSpan} style={{ color: `${product.inStock ? 'green' : 'red'}` }}>{product.inStock ? '◉ in Stock' : '◉ out of Stock'} </span>
          </div>
        </Link>

        <div className={styles.product}>
          <h3 style={{ color: style.namecolor, fontSize: `${style.namefontSize}px` }}>{product.name}</h3>
          <div className={styles.rating}>  {favorit && <img className='fav'
            onClick={onFavClick} src={favorit.src} alt="" />}</div>
        </div>

        <section className={styles.info}>

          <div className={styles.buyInfo}  >
            <h2 style={{ color: style.pricecolor, fontSize: `${style.pricefontSize}px` }}>{product.currency == 'UAH' ? getUANtoUSD(product.price) : product.price} USD</h2 >
            <div className={styles.basketBtns} >
              <button onClick={() => addToBasket(product)} >+</button>
              {basket[product.id]?.count}
              {isInBasket && <button onClick={() => deleteFromBasket(product)}>-</button>}
            </div>
          </div>

        </section>
        {isOwner && <>
          <span className={styles.deleteBtn} onClick={deleteItem}>×</span>
          <div className={styles.editBtn}><img src="/edit.png" onClick={onEdit} /> </div>
        </>}

      </article>

    </>
  )
}
