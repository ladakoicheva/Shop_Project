import style from './BasketProductCard.module.css';
import type { productI } from '../../../../types/types';
import { ImageProduct } from '../../../utils/Image';
import { memo } from 'react';
import { useAppSelector } from '../../../redux/type';
import { convector } from '../../../utils/convector';

type props = {
  data: { count: number; product: productI };
  deleteFromBasket: () => void;
  addToBasket: () => void;
};

function BasketProductCard({ data, deleteFromBasket, addToBasket }: props) {
  const { settings, rates } = useAppSelector((s) => s.auth);

  const convertedPrice = convector(
    settings.currency || 'USD',
    data.product.currency || 'USD',
    data.product.price * data.count,
    rates
  );

  return (
    <article className={style.basketProductCard}>
      <div className={style.wrapper}>
        <div className={style.imageWrapper}>
          <ImageProduct src={data.product.img!} alt={data.product.name} className="" />
        </div>
        <div className={style.productName}>
          <h3 className={style.productTitle}>{data.product.name}</h3>
        </div>

        <div className={style.quantityGroup}>
          <button className={style.qtyBtn} onClick={addToBasket} title="Увеличить количество">
            +
          </button>
          <span className={style.countText}>{data.count}</span>
          <button className={style.qtyBtn} onClick={deleteFromBasket} title="Уменьшить количество">
            -
          </button>
        </div>

        <div className={style.priceDisplay}>
          {convertedPrice} {settings.currency || 'USD'}
        </div>
      </div>
    </article>
  );
}

const getIsRender = (prev: props, next: props): boolean => {
  if (prev.data.count !== next.data.count) return false;
  return true;
};

export default memo(BasketProductCard, getIsRender);
