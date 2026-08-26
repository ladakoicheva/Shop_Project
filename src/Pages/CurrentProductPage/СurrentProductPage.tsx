import { useNavigate, useParams, Link } from 'react-router-dom';
import { getOneProduct } from '../../services/firebase/db/products';
import { useEffect, useState } from 'react';
import styles from './CurrentProductPage.module.css';
import { addToBasket, deleteFromBasket } from '../../redux/basket/basket';
import { useAppDispatch, useAppSelector } from '../../redux/type';
import { openLoading, closeLoading } from '../../redux/loading/loading';
import type { productI } from '../../../types/types';
import { CartIcon, CheckIcon, CloseIcon } from '../../utils/svgIcons';
import { convector } from '../../utils/convector';

export default function CurrentProductPage() {
  const [currentProduct, setCurrentProduct] = useState<productI | null>(null);

  const navigate = useNavigate();
  const params = useParams<{ uid: string; id: string }>();
  const dispatch = useAppDispatch();
  const { settings, rates } = useAppSelector((s) => s.auth);
  const basket = useAppSelector((s) => s.basket.data);
  const isInBasket = currentProduct ? basket[currentProduct.id] : false;

  useEffect(() => {
    async function getCurrentProduct() {
      if (!params.uid || !params.id) return;
      dispatch(openLoading());
      const res = await getOneProduct(params.uid, params.id);

      if (res.ok && res.data) {
        setCurrentProduct(res.data);
      } else if (res.ok && !res.data) {
        navigate('*');
      }
      dispatch(closeLoading());
    }
    getCurrentProduct();
  }, [params.uid, params.id, dispatch, navigate]);

  if (!currentProduct) return null;

  const convertedPrice = convector(
    settings.currency || 'USD',
    currentProduct.currency || 'USD',
    currentProduct.price,
    rates
  );

  return (
    <div className={styles.container}>
      {/* Breadcrumb Navigation */}
      <nav className={styles.breadcrumb}>
        <Link to={`/products/${params.uid}`}>Каталог товаров</Link>
        <span>&gt;</span>
        <span>{currentProduct.name}</span>
      </nav>

      {/* Main Product Card */}
      <div className={styles.productCard}>
        {/* Left Gallery */}
        <div className={styles.imgGallery}>
          <img
            className={styles.productImg}
            src={currentProduct.img ? currentProduct.img : '/No-Image.svg.png'}
            alt={currentProduct.name}
          />
        </div>

        {/* Right Details */}
        <div className={styles.details}>
          <h1 className={styles.title}>{currentProduct.name}</h1>

          <div className={styles.statusRow}>
            <span
              className={`${styles.stockBadge} ${
                currentProduct.inStock ? styles.inStock : styles.outOfStock
              }`}
            >
              {currentProduct.inStock ? (
                <>
                  <CheckIcon size={16} color="#059669" /> В наличии
                </>
              ) : (
                <>
                  <CloseIcon size={16} color="#e11d48" /> Нет в наличии
                </>
              )}
            </span>

            {currentProduct.rating && (
              <span className={styles.ratingBadge}>★ {currentProduct.rating} / 5</span>
            )}

            {currentProduct.category && (
              <span className={styles.categoryTag}>{currentProduct.category}</span>
            )}
          </div>

          <div className={styles.priceBox}>
            <span className={styles.price}>{convertedPrice}</span>
            <span className={styles.currency}>{settings.currency || 'USD'}</span>
          </div>

          <div className={styles.actionRow}>
            {!isInBasket ? (
              <button
                className={styles.addBtn}
                onClick={() => dispatch(addToBasket(currentProduct))}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <CartIcon size={20} color="#ffffff" />
                <span>Добавить в корзину</span>
              </button>
            ) : (
              <div className={styles.quantityControls}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => dispatch(addToBasket(currentProduct))}
                >
                  +
                </button>
                <span className={styles.qtyCount}>{basket[currentProduct.id]?.count}</span>
                <button
                  className={styles.qtyBtn}
                  onClick={() => dispatch(deleteFromBasket(currentProduct))}
                >
                  -
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
              Купить сейчас
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
