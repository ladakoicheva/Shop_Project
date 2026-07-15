import { useNavigate, useParams } from "react-router-dom"
import { getOneProduct } from "../../services/firebase/db/products";
import { useEffect } from "react";
import { useState } from "react";
import styles from './CurrentProductPage.module.css'
import { Link } from "react-router-dom";
import { addToBasket,deleteFromBasket } from "../../redux/basket/basket";
import { useAppDispatch,useAppSelector } from "../../redux/type";
import { openLoading, closeLoading } from "../../redux/loading/loading";
import type { productI } from "../../../types/types";

export default function CurrentProductPage() {
  const [currentProduct, setCurrentProduct] = useState<productI|null>(null);

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();
  const basket = useAppSelector((s)=>s.basket.data)
  // const { openLoading, closeLoading } = auth
  const isInBasket = currentProduct ?basket[currentProduct.id]:false

  useEffect(() => {

    
    //loading
    async function getCurrentProduct() {
      dispatch(openLoading());
      const res = await getOneProduct(params.uid!, params.id!);

      if (res.ok) {
        setCurrentProduct(res.data!)
      }
      if (res.ok && !res.data) {
        navigate("*")
      }
      dispatch(closeLoading());

    }
    getCurrentProduct()

    

  }, [params.uid, params.id])

  return (
    <>
      {currentProduct &&
        <div className={styles.wrapper}>

          <aside className={styles.productImg}>
            <nav>
              <Link to={`/products/${params.uid}`}>Products &gt; </Link>
              <Link to={`/products/${params.uid}/product/${params.id}`}>{currentProduct.name} </Link>
            </nav>
            <img src={currentProduct.img ? currentProduct.img : '/No-Image.svg.png'} alt="" />
          </aside>
          <section className={styles.productInfo}>
            <h1>{currentProduct.name}</h1>
            <h2>{currentProduct.inStock ?
              'in Stock' : 'out of Stock'}</h2>
            <span>
              {currentProduct.rating}/5
            </span>
            {currentProduct.category}

            <h3>{currentProduct.price} {currentProduct.currency}</h3>
            <div className={styles.btns}>
              {!isInBasket ?
                <button onClick={() => dispatch(addToBasket(currentProduct))} >Add to basket</button>
                :
                <div className={styles.basketBtns} >
                  <button onClick={() => dispatch(addToBasket(currentProduct))} >+</button>
                  {basket[currentProduct.id]?.count}
                  <button onClick={() => dispatch(deleteFromBasket(currentProduct))}>-</button>
                </div>
              }
              <button>Buy now</button>
            </div>


          </section>

        </div >
      }</>
  )
}

