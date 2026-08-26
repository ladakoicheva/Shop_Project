import { useMemo } from 'react';
import BasketProductCard from './BasketProductCard/BasketProductCard';
import style from './BasketPage.module.css';
import { saveHistory, updateTotal } from '../../services/firebase/db/history';
import { useAppDispatch, useAppSelector } from '../../redux/type';
import { v4 as uuidv4 } from 'uuid';
import { addToBasket, deleteFromBasket, resetBasket } from '../../redux/basket/basket';
import { getHistoryBasketUpdate } from '../../redux/history/history';
import type { productI, historyI } from '../../../types/types';
import { convector } from '../../utils/convector';
import { Link } from 'react-router-dom';
import { CartIcon } from '../../utils/svgIcons';

export default function BasketPage() {
  const { user, settings, rates } = useAppSelector((s) => s.auth);
  const basket = useAppSelector((s) => s.basket.data);
  const dispatch = useAppDispatch();

  const basketsArr: Array<{ count: number; product: productI }> = useMemo(
    () => Object.values(basket),
    [basket]
  );
  const isEmpty = basketsArr.length === 0;

  const total = useMemo<number>(() => {
    const totalCalc = Math.round(
      basketsArr.reduce((acc, el): number => {
        acc +=
          convector(settings.currency, el.product.currency, el.product.price, rates) *
          el.count;
        return +acc;
      }, 0)
    );
    return +totalCalc;
  }, [basketsArr, settings.currency, rates]);

  const memoCards = useMemo(() => {
    return basketsArr.map((el) => (
      <BasketProductCard
        key={el.product.id}
        data={el}
        deleteFromBasket={() => dispatch(deleteFromBasket(el.product))}
        addToBasket={() => dispatch(addToBasket(el.product))}
      />
    ));
  }, [basketsArr, dispatch]);

  const onSave = async () => {
    const id = uuidv4();
    if (!user) return;
    const productsData = basketsArr.map((el) => {
      return {
        price: el.product.price,
        currency: el.product.currency,
        img: el.product.img,
        name: el.product.name,
        id: el.product.id,
        count: el.count,
      };
    });
    const data: historyI = {
      id: id,
      isArchived: false,
      date: Date.now(),
      totalSum: +total,
      discount: 0,
      products: productsData,
    };
    const res = await Promise.all([
      updateTotal(total, user.uid!),
      saveHistory(data, user.uid!, id),
    ]);

    if (res) {
      dispatch(resetBasket());
      dispatch(getHistoryBasketUpdate(data));
    }
  };

  if (isEmpty) {
    return (
      <div className={style.container}>
        <div className={style.emptyCart}>
          <CartIcon size={64} color="#10b981" />
          <h2 className={style.emptyTitle}>Ваша корзина пуста</h2>
          <p className={style.emptyText}>Добавьте понравившиеся товары из каталога</p>
          <Link to={user?.uid ? `/products/${user.uid}` : '/'} className={style.shopBtn}>
            Перейти к каталогу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <h1 className={style.pageTitle}>Корзина ({basketsArr.length})</h1>

      <div className={style.cartLayout}>
        {/* Left Column - Product Items */}
        <div className={style.itemList}>{memoCards}</div>

        {/* Right Column - Order Summary Sidebar */}
        <div className={style.summaryCard}>
          <h2 className={style.summaryTitle}>Итого по заказу</h2>

          <div className={style.summaryRow}>
            <span>Товаров в заказе:</span>
            <span>{basketsArr.reduce((acc, el) => acc + el.count, 0)} шт.</span>
          </div>

          <div className={style.summaryTotalRow}>
            <span className={style.summaryTotalLabel}>К оплате:</span>
            <span className={style.summaryTotalValue}>
              {total} {settings.currency || 'USD'}
            </span>
          </div>

          <button className={style.checkoutBtn} onClick={onSave}>
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
}
