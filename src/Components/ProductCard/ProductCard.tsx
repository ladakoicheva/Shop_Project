import styles from './ProductCard.module.css'
import { Link, useParams } from 'react-router-dom'
import { images } from '../../utils/images'
import {  memo } from 'react'
import { removeProduct } from '../../services/firebase/db/products'
import type { productI, settingsI } from '../../../types/types'
import { useAppDispatch } from '../../redux/type'
import { deleteItemFromFav ,addToFav} from '../../redux/fav/fav'
import type { AuthState } from '../../redux/auth/type'
import Price from './Price'
import { Image, ImageProduct, ImageEdit } from '../../utils/Image'

interface dataI{
  [id: string]: {
    count: number,
    product: productI
}
}
type props = {
  isFavorit: boolean
  product: productI,
  onEdit:() => void,
  style: settingsI,
  basketContext: {
    addToBasket: () => void
    deleteFromBasket:() => void
    data:dataI
  }
  auth: AuthState
}


function ProductCard({ product, onEdit, style, basketContext ,auth, isFavorit}:props) {


  const { user ,rates} = auth
  const isInBasket = basketContext.data[product.id];
  const params = useParams<{uid:string}>();
  const isOwner = params.uid === user?.uid;
  const dispatch = useAppDispatch()
  const deleteItem = async () => {
    if (!user?.uid) return;
  
    const res = await removeProduct(product, user.uid, product.id);//!
    if(res.ok) basketContext.deleteFromBasket()
  }

  const onFavClick = () => {
    if(!params.uid && !user?.uid ) return
    !isFavorit ?
      dispatch(addToFav({ uid: user?.uid!, ownersUid: params.uid!, productId: product.id }))
      : dispatch(deleteItemFromFav({ uid: user?.uid!, ownersUid: params?.uid!, productId: product.id }));
  }
  return (
    <li>
      <article style={{ backgroundColor: style?.bgbg }} className={styles.productCard}   >

        <Link to={`product/${product.id}`}>
          <div className={styles.img} >
            <ImageProduct src={product.img} alt={product.name} />
            <span className={styles.inStockSpan} style={{ color: `${product.inStock ? 'green' : 'red'}` }}>{product.inStock ? '◉ in Stock' : '◉ out of Stock'} </span>
          </div>
        </Link>

        <div className={styles.product}>
          
          <h3 style={{ color: style.namecolor, fontSize: `${style.namefontSize}px` }}>{product.name}</h3>
          <div className={styles.rating}>
            <Image src={isFavorit ? images.star.on : images.star.off} defaultSRC={images.star.off} onClick={onFavClick} className='fav' alt="favorite star" />
          </div>
        </div>

        <section className={styles.info}>

          <div className={styles.buyInfo}  >
            <Price style = {style} product ={product} rates ={rates} />
            
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
          <div className={styles.editBtn}><ImageEdit onClick={onEdit} alt="edit" /> </div>
        </>}

      </article>

    </li>
  )
}

const getIsRender = (prev: props, next: props) => {
  const prevCount = prev.basketContext.data[prev.product.id]?.count;
  const nextCount = next.basketContext.data[next.product.id]?.count
  if (prevCount !== nextCount) return false
  if (prev.isFavorit !== next.isFavorit) return false
  if(prev.product !== next.product) return false

 
  
return true
}

const memoComponent = memo(ProductCard, getIsRender)
export default memoComponent