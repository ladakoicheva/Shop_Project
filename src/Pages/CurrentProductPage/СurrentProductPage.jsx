import { useNavigate, useParams } from "react-router-dom"
import { getOneProduct } from "../../firebase/db/products";
import { useEffect } from "react";
import { useState } from "react";
import { useStoreContext } from "../../store/store";
import styles from './CurrentProductPage.module.css'
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function СurrentProductPage() {
  const [currentProduct, setCurrentProduct] = useState(null);

  const navigate = useNavigate();
  const params = useParams();
  const store = useStoreContext();
  const isInBasket = store.basket[currentProduct?.id]

  useEffect(() => {

    //loading
    async function getCurrentProduct() {
      store.openLoading();
      const res = await getOneProduct(params.uid, params.id);

      if (res.ok) {
        setCurrentProduct(res.data)
      }
      if (res.ok && !res.data) {
        navigate("*")
      }
      store.closeLoading();

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
                <button onClick={() => store.addToBasket(currentProduct)} >Add to basket</button>
                :
                <div className={styles.basketBtns} >
                  <button onClick={() => store.addToBasket(currentProduct)} >+</button>
                  {store.basket[currentProduct.id]?.count}
                  <button onClick={() => store.deleteFromBasket(currentProduct)}>-</button>
                </div>
              }
              <button>Buy now</button>
            </div>


          </section>

        </div >
      }</>
  )
}

