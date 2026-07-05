import styles from './ProductCard.module.css'
import { getUANtoUSD } from '../../utils/convector'
import { Link, useParams } from 'react-router-dom'
import { images } from '../../utils/images'
import { useCallback, useMemo } from 'react'
import { useFavContext } from '../../store/features/useFav';
import { removeProduct } from '../../services/firebase/db/products'
import { addToBasket } from '../../redux/basket/basket'



export default function ProductCard({ product, onEdit, style, basketContext ,auth}) {

  const { user } = auth
  const { deleteItemFromFav, addToFav, favorites } = useFavContext();

  const isInBasket = basketContext.data[product.id];
  const params = useParams();
  const isOwner = params.uid === user?.uid;
 

  const deleteItem = useCallback(async () => {
    const res = await removeProduct(product, user.uid, product.id);
    if(res.ok) basketContext.deleteFromBasket()
  }, [product, user,basketContext])

  const favorit = useMemo(() => {
    if (!user) return null



    const isInFav = favorites.includes(product.id);

    return {
      is: isInFav,
      src: isInFav ? images.star.on : images.star.off
    }

  }, [favorites, user, product.id])

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
              <button onClick={basketContext.addToBasket} >+</button>
              {basketContext.data[product.id]?.count}
              {isInBasket && <button onClick={basketContext.deleteFromBasket
              }>-</button>}
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
