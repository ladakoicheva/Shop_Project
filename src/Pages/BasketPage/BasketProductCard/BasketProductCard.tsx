import style from './BasketProductCard.module.css'
import type { productI } from '../../../../types/types'
import { ImageProduct } from '../../../utils/Image'
import  { memo } from 'react'

type props = {
  data: {count:number,product:productI},
  deleteFromBasket:()=>void,
  addToBasket:()=>void,
  
}

 function BasketProductCard({ data , deleteFromBasket ,addToBasket }:props) {
  console.log('render card')
  return (
    <>
      <article className={style.basketProductCard}>
        <div className={style.basketProductCard__wrapper}>
          <div className={style.basketProductCard__image}>
            <ImageProduct src={data.product.img!} alt="productImg" className='' />
          </div>
          <div className={style.basketProductCard__productName}><h3>{data.product.name} </h3></div>

          <div className={style.basketProductCard__productQuantity}><div className={style.basketBtn}><button onClick ={addToBasket}>+</button><span>{data.count}</span><button onClick={deleteFromBasket}>-</button></div> </div>
          <div className={style.basketProductCard__productPrice}><p>{(data.product.price * data.count).toFixed(2)} {data.product.currency}</p></div>
        </div>


      </article>
    </>
  )
}

const getIsRender = (prev: props, next: props): boolean => {
   if(prev.data !== next.data)return false
  return true
}

export default memo(BasketProductCard, getIsRender)
