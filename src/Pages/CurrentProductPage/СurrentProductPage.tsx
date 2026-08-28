import { useNavigate, useParams, Link } from "react-router-dom";
import { getOneProduct } from "../../services/firebase/db/products";
import { useEffect, useState } from "react";
import styles from './CurrentProductPage.module.css';
import { addToBasket, deleteFromBasket } from "../../redux/basket/basket";
import { useAppDispatch, useAppSelector } from "../../redux/type";
import { openLoading, closeLoading } from "../../redux/loading/loading";
import type { productI } from "../../../types/types";
import { ImageProduct } from "../../utils/Image";

export default function CurrentProductPage() {
  const [currentProduct, setCurrentProduct] = useState<productI | null>(null);

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();
  const basket = useAppSelector((s) => s.basket.data);
  const isInBasket = currentProduct ? basket[currentProduct.id] : false;

  useEffect(() => {
    async function getCurrentProduct() {
      dispatch(openLoading());
      const res = await getOneProduct(params.uid!, params.id!);

      if (res.ok) {
        setCurrentProduct(res.data!);
      }
      if (res.ok && !res.data) {
        navigate("*");
      }
      dispatch(closeLoading());
    }
    getCurrentProduct();
  }, [params.uid, params.id]);

  const { user } = useAppSelector((s) => s.auth);
  const shopUid = params.uid || user?.uid;

  return (
    <>
      {currentProduct && (
        <div className={styles.container}>
          <nav className={styles.breadcrumb}>
            <Link to={shopUid ? `/products/${shopUid}` : '/add'}>Products</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{currentProduct.name}</span>
          </nav>

          <div className={styles.wrapper}>
            <aside className={styles.productImg}>
              <ImageProduct src={currentProduct.img} alt={currentProduct.name} />
            </aside>

            <section className={styles.productInfo}>
              <div className={styles.headerMeta}>
                <span className={styles.categoryBadge}>{currentProduct.category}</span>
                <span className={currentProduct.inStock ? styles.stockBadge : styles.outOfStockBadge}>
                  ● {currentProduct.inStock ? 'in Stock' : 'out of Stock'}
                </span>
              </div>

              <h1 className={styles.title}>{currentProduct.name}</h1>

              <div className={styles.ratingRow}>
                <svg className={styles.starIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className={styles.ratingValue}>{currentProduct.rating} / 5</span>
              </div>

              <div className={styles.priceRow}>
                <h2 className={styles.price}>{currentProduct.price?.toLocaleString()}</h2>
                <span className={styles.currency}>{currentProduct.currency || 'UAH'}</span>
              </div>

              <div className={styles.actionRow}>
                {!isInBasket ? (
                  <button
                    className={styles.addToCartBtn}
                    onClick={() => dispatch(addToBasket(currentProduct))}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <circle cx="9" cy="21" r="1.5" />
                      <circle cx="19" cy="21" r="1.5" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    <span>Add to Basket</span>
                  </button>
                ) : (
                  <div className={styles.quantitySelector}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => dispatch(deleteFromBasket(currentProduct))}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className={styles.qtyCount}>{basket[currentProduct.id]?.count}</span>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => dispatch(addToBasket(currentProduct))}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                )}

                <button
                  className={styles.buyNowBtn}
                  onClick={() => {
                    if (!isInBasket) dispatch(addToBasket(currentProduct));
                    navigate('/basket');
                  }}
                >
                  Buy Now
                </button>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
