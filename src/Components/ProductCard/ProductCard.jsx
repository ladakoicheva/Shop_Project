import React, { useEffect } from 'react'
import style from './ProductCard.module.css'
import { getUANtoUSD } from '../../utils/convector'
import { Link, useParams } from 'react-router-dom'
import { useStoreContext } from '../../store/store'
import { useState } from 'react'
import { images } from '../../utils/images'
import { useMemo } from 'react'
import { getAllFavProducts } from '../../services/firebase/db/favProducts'



export default function ProductCard({ product, onEdit, deleteItem }) {

  const { addToBasket, deleteFromBasket, basket, user,
    setEditCurrentProduct, setProductToEdit, deleteProduct, deleteItemFromFav, addToFav, favorites, cardStyle } = useStoreContext();

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
      <article style={{ background: cardStyle.bg[0] }} className={style.productCard}   >

        <Link to={`product/${product.id}`}>
          <div className={style.img} >
            <img src={product.img || '/No-Image.svg.png'} alt="" />
            <span className={style.inStockSpan} style={{ color: `${product.inStock ? 'green' : 'red'}` }}>{product.inStock ? '◉ in Stock' : '◉ out of Stock'} </span>
          </div>
        </Link>

        <div className={style.product}>
          <h3 style={{ color: cardStyle.name[0], fontSize: `${cardStyle.name[1]}px` }}>{product.name}</h3>
          <div className={style.rating}>  {favorit && <img className='fav'
            onClick={onFavClick} src={favorit.src} alt="" />}</div>
        </div>

        <section className={style.info}>

          <div className={style.buyInfo}  >
            <h2 style={{ color: cardStyle.price[0], fontSize: `${cardStyle.price[1]}px` }}>{product.currency == 'UAH' ? getUANtoUSD(product.price) : product.price} USD</h2 >
            <div className={style.basketBtns} >
              <button onClick={() => addToBasket(product)} >+</button>
              {basket[product.id]?.count}
              {isInBasket && <button onClick={() => deleteFromBasket(product)}>-</button>}
            </div>
          </div>

        </section>
        {isOwner && <>
          <span className={style.deleteBtn} onClick={deleteItem}>×</span>
          <div className={style.editBtn}><img src="/edit.png" onClick={onEdit} /> </div>
        </>}

      </article>

    </>
  )
}
