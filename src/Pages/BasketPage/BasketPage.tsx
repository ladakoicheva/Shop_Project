import { useMemo } from "react";
import BasketProductCard from "./BasketProductCard/BasketProductCard";
import style from './BasketPage.module.css';
import { saveHistory } from "../../services/firebase/db/history";
import { updateTotal } from "../../services/firebase/db/history";
import { useAppDispatch } from "../../redux/type";
import { v4 as uuidv4 } from "uuid";
import {
  addToBasket,
  deleteFromBasket,
  resetBasket,
} from "../../redux/basket/basket";
import { getHistoryBasketUpdate } from "../../redux/history/history";
import type { productI } from "../../../types/types";
import { useAppSelector } from "../../redux/type";
import type { historyI } from "../../../types/types";
import { convector } from "../../utils/convector";


export default function BasketPage() {
  // const { basket, deleteFromBasket, resetBasket } =basketContext
  const { user} = useAppSelector((s) => s.auth)
  const basket = useAppSelector((s) => s.basket.data);
  const {settings,rates} = useAppSelector((s)=>s.auth)
  const dispatch = useAppDispatch();
  const basketsArr:Array<{ count: number, product: productI }> = useMemo(() => Object.values(basket), [basket]);
  const isEmpty = basketsArr.length == 0 ? true : false;
  console.log('render page')

  const total = useMemo<number>(() => {
    const total = Math.round(basketsArr.reduce((acc, el):number => {
      acc += convector(settings.currency,el.product.currency,el.product.price,rates) * el.count
      return +acc
    }, 0))
  
    return +total
  }, [basketsArr])

  const memoCards = useMemo(() => {
       return basketsArr.map((el) => <li key={el.product.id}>
        <BasketProductCard data={el} deleteFromBasket={() => dispatch(deleteFromBasket(el.product))} addToBasket={() => dispatch(addToBasket(el.product))} />
        </li>)
  },[basketsArr])

  const onSave = async () => {
    const id = uuidv4()
    if (!user) return;
    const productsData = basketsArr.map((el) => {
      return {
        price: el.product.price,
        currency: el.product.currency,
        img: el.product.img,
        name: el.product.name,
        id: el.product.id,
        count: el.count,
    
      }
    })
    const data:historyI  = {
      id:id,
      isArchived:false,
      date: Date.now(),
      totalSum: +total,
      discount: 0,
      products: productsData
    };
    //   }
    const res = await Promise.all([updateTotal(total, user.uid!), saveHistory(data, user.uid!,id)])//!

    if (res) {
      dispatch(resetBasket());
      dispatch(getHistoryBasketUpdate(data))
      

    }

  }
  if (isEmpty) return <div>No products</div>;

  return (
    <>
      <ul className={style.wrapper}>{
       memoCards
      }
        <h1>Total:{total} {settings.currency}</h1>
        <button onClick={onSave}>BUY</button>
      </ul>

    </>

  )
}










