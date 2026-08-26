import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useAppSelector } from '../../redux/type';
import { memo } from 'react';
import { CartIcon } from '../../utils/svgIcons';

function BasketIcon() {
  const basket = useAppSelector((s) => s.basket.data);
  const count = Object.keys(basket).length;

  return (
    <div className={styles.basketWrapper}>
      <Link to="/basket" className={styles.basketIcon} title="Перейти в корзину">
        <CartIcon size={24} color="#0f172a" />
        {count > 0 && <span className={styles.basketCount}>{count}</span>}
      </Link>
    </div>
  );
}

export default memo(BasketIcon, () => true);