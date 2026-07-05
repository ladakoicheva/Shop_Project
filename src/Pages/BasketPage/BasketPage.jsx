import { useMemo } from "react";
import BasketProductCard from "./BasketProductCard/BasketProductCard";
import style from './BasketPage.module.css';
import { saveHistory } from "../../services/firebase/db/history";
import { updateTotal } from "../../services/firebase/db/history";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  deleteFromBasket,
  resetBasket,
} from "../../redux/basket/basket";



export default function BasketPage({ historyContext, auth }) {
  // const { basket, deleteFromBasket, resetBasket } =basketContext
  const { user } = auth
  const { getHistoryBasketUpdate } = historyContext

  const basket = useSelector((s) => s.basket.data);
  const dispatch = useDispatch();




  const basketsArr = useMemo(() => Object.values(basket), [basket]);
  const isEmpty = basketsArr.length == 0 ? true : false;

  const total = useMemo(() => {
    return basketsArr.reduce((acc, el) => {
      acc += el.product.price * el.count
      return acc
    }, 0).toFixed(2)
  }, [basketsArr])

  const onSave = async () => {
    if (!user) return;
    const productsData = basketsArr.map((el) => {
      return {
        price: el.product.price,
        currency: el.product.currency,
        img: el.product.img,
        name: el.product.name,
        id: el.product.id,
        count: el.count
      }
    })
    const data = {
      date: Date.now(),
      totalSum: total,
      discount: 0,
      products: productsData
    };
    //   }
    const res = await Promise.all([updateTotal(total, user.uid), saveHistory(data, user.uid)])


    if (res) {
      dispatch(resetBasket());
      getHistoryBasketUpdate(res[1].data)


    }

  }
  if (isEmpty) return <div>No products</div>;

  return (
    <>
      <ul className={style.wrapper}>{
        basketsArr.map((el) => <li key={el.product.id}>
          <BasketProductCard data={el} deleteFromBasket={() => dispatch(deleteFromBasket(el.product))} addToBasket={() => dispatch(addToBasket(el.product))} />
        </li>)
      }
        <h1>Total:{total}</h1>
        <button onClick={onSave}>BUY</button>
      </ul>

    </>

  )
}


//const ref = doc(...путь)
//await updateDoc(ref,{ sum:increment(total)})







