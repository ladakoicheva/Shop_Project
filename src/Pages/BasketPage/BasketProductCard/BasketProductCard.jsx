import style from './BasketProductCard.module.css'

export default function BasketProductCard({ data, addToBasket , deleteFromBasket  }) {

  return (
    <>
      <article className={style.basketProductCard}>
        <div className={style.basketProductCard__wrapper}>
          <div className={style.basketProductCard__image}><img src={data.product.img} alt="productImg" /></div>
          <div className={style.basketProductCard__productName}><h3>{data.product.name} </h3></div>

          <div className={style.basketProductCard__productQuantity}><div className={style.basketBtn}><button onClick ={()=>addToBasket(data.product)}>+</button><span>{data.count}</span><button onClick={()=>deleteFromBasket(data.product)}>-</button></div> </div>
          <div className={style.basketProductCard__productPrice}><p>{(data.product.price * data.count).toFixed(2)} {data.product.currency}</p></div>
        </div>


      </article>
    </>
  )
}
