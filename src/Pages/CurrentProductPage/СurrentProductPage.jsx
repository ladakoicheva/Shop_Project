import { useNavigate, useParams } from "react-router-dom"
import { getOneProduct } from "../../services/firebase/db/products";
import { useEffect } from "react";
import { useState } from "react";
import styles from './CurrentProductPage.module.css'
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { addToBasket,deleteFromBasket } from "../../redux/basket/basket";
import { useDispatch, useSelector } from "react-redux";

export default function CurrentProductPage({  auth }) {
  const [currentProduct, setCurrentProduct] = useState(null);

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const basket = useSelector((s)=>s.basket.data)
  const { openLoading, closeLoading } = auth
  const isInBasket = basket[currentProduct?.id]

  useEffect(() => {

    
    //loading
    async function getCurrentProduct() {
      openLoading();
      const res = await getOneProduct(params.uid, params.id);

      if (res.ok) {
        setCurrentProduct(res.data)
      }
      if (res.ok && !res.data) {
        navigate("*")
      }
      closeLoading();

    }
    getCurrentProduct()

    

  }, [params.uid, params.id, navigate, openLoading, closeLoading])

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

