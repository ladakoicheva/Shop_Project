import styles from './ProductCard.module.css';
import { Link, useParams } from 'react-router-dom';
import { memo } from 'react';
import { removeProduct } from '../../services/firebase/db/products';
import type { productI, settingsI } from '../../../types/types';
import { useAppDispatch } from '../../redux/type';
import { deleteItemFromFav, addToFav } from '../../redux/fav/fav';
import type { AuthState } from '../../redux/auth/type';
import Price from './Price';
import { CheckIcon, CloseIcon, HeartIcon, EditIcon, TrashIcon } from '../../utils/svgIcons';

interface dataI {
  [id: string]: {
    count: number;
    product: productI;
  };
}

type props = {
  isFavorit: boolean;
  product: productI;
  onEdit: () => void;
  style: settingsI;
  basketContext: {
    addToBasket: () => void;
    deleteFromBasket: () => void;
    data: dataI;
  };
  auth: AuthState;
};

function ProductCard({ product, onEdit, style, basketContext, auth, isFavorit }: props) {
  const { user, rates } = auth;
  const isInBasket = basketContext.data[product.id];
  const params = useParams<{ uid: string }>();
  const isOwner = params.uid === user?.uid;
  const dispatch = useAppDispatch();

  const deleteItem = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user?.uid) return;
    const res = await removeProduct(product, user.uid, product.id);
    if (res.ok) basketContext.deleteFromBasket();
  };

  const onFavClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!params.uid && !user?.uid) return;
    !isFavorit
      ? dispatch(addToFav({ uid: user?.uid!, ownersUid: params.uid!, productId: product.id }))
      : dispatch(deleteItemFromFav({ uid: user?.uid!, ownersUid: params?.uid!, productId: product.id }));
  };

  return (
    <li style={{ height: '100%' }}>
      <article
        className={styles.productCard}
        style={{ backgroundColor: style?.bgbg || '#ffffff' }}
      >
        <Link to={`product/${product.id}`} style={{ display: 'block', textDecoration: 'none' }}>
          <div className={styles.imgWrapper}>
            <img
              className={styles.productImg}
              src={product.img || '/No-Image.svg.png'}
              alt={product.name}
            />

            <span
              className={`${styles.inStockBadge} ${
                product.inStock ? styles.inStock : styles.outOfStock
              }`}
            >
              {product.inStock ? (
                <>
                  <CheckIcon size={14} color="#059669" /> В наличии
                </>
              ) : (
                <>
                  <CloseIcon size={14} color="#f43f5e" /> Нет в наличии
                </>
              )}
            </span>

            <button
              type="button"
              className={styles.favBtn}
              onClick={onFavClick}
              title={isFavorit ? 'Удалить из избранного' : 'Добавить в избранное'}
            >
              <HeartIcon
                size={20}
                color={isFavorit ? '#f43f5e' : '#64748b'}
                fill={isFavorit ? '#f43f5e' : 'none'}
              />
            </button>

            {isOwner && (
              <div className={styles.ownerToolbar}>
                <button
                  type="button"
                  className={`${styles.ownerBtn} ${styles.deleteBtn}`}
                  onClick={deleteItem}
                  title="Удалить товар"
                >
                  <TrashIcon size={16} color="#f43f5e" />
                </button>
                <button
                  type="button"
                  className={`${styles.ownerBtn} ${styles.editBtn}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onEdit();
                  }}
                  title="Редактировать товар"
                >
                  <EditIcon size={16} color="#0f172a" />
                </button>
              </div>
            )}
          </div>

          <div className={styles.productHeader} style={{ marginTop: '10px' }}>
            <h3
              className={styles.productName}
              style={{
                color: style?.namecolor,
                fontSize: style?.namefontSize ? `${style.namefontSize}px` : undefined,
              }}
            >
              {product.name}
            </h3>
          </div>
        </Link>

        <section className={styles.infoSection}>
          <div className={styles.buyRow}>
            <Price style={style} product={product} rates={rates} />

            <div className={styles.basketControls}>
              <button
                className={styles.actionBtn}
                onClick={basketContext.addToBasket}
                title="Добавить в корзину"
              >
                +
              </button>
              {isInBasket && (
                <>
                  <span className={styles.countBadge}>{basketContext.data[product.id]?.count}</span>
                  <button
                    className={styles.actionBtn}
                    onClick={basketContext.deleteFromBasket}
                    title="Уменьшить количество"
                  >
                    -
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      </article>
    </li>
  );
}

const getIsRender = (prev: props, next: props) => {
  const prevCount = prev.basketContext.data[prev.product.id]?.count;
  const nextCount = next.basketContext.data[next.product.id]?.count;
  if (prevCount !== nextCount) return false;
  if (prev.isFavorit !== next.isFavorit) return false;
  if (prev.product !== next.product) return false;
  if (prev.style !== next.style) return false;
  return true;
};

const memoComponent = memo(ProductCard, getIsRender);
export default memoComponent;