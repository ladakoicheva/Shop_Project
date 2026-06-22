import { useMemo, useState } from "react";
import { useStoreContext } from "../../store/store";
import useBasket from "../../store/features/useBasket";
import BasketProductCard from "./BasketProductCard/BasketProductCard";
import style from './BasketPage.module.css';
import { saveHistory } from "../../services/firebase/db/history";
import { count } from "firebase/firestore";

export default function BasketPage() {
  const { basket, addToBasket, deleteFromBasket, resetBasket } = useBasket()
  const { user, history, updateHistory ,setHistory} = useStoreContext();
  console.log(basket);

  const basketsArr = useMemo(() => Object.values(basket), [basket]);
  const isEmpty = basketsArr.length == 0 ? true : false;
  console.log(basketsArr)
  console.log(isEmpty)

  const total = useMemo(() => {
    return basketsArr.reduce((acc, el) => {
      acc += el.product.price * el.count
      return acc
    }, 0).toFixed(2)
  }, [basketsArr])

  const onSave = async () => {
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
    const res = await saveHistory(data, user.uid);
    if (res.ok) {
      resetBasket();
      setHistory([data,...history])
      console.log(history)
    }
    console.log(res)
  }
  if (isEmpty) return <div>No products</div>;

  return (
    <>
      <ul className={style.wrapper}>{
        basketsArr.map((el) => <li key={el.product.id}>
          <BasketProductCard data={el} addToBasket={addToBasket} deleteFromBasket={deleteFromBasket} />
        </li>)
      }
        <h1>Total:{total}</h1>
        <button onClick={onSave}>BUY</button>
      </ul>

    </>

  )
}




const h = {
  date: 1912313,
  totalSum: 400,
  discount: 0,
  products: [
    {
      "price": 170,
      "currency": "USD",
      "img": "https://firebasestorage.googleapis.com/v0/b/shop-cffec.firebasestorage.app/o/477rycF7GFg17Xthw2aMU8xY0tX2%2Fb29b18f5-d9a9-44ca-9535-86f407fd8ac0?alt=media&token=46f4503d-c9f6-44c1-a229-7e248dc16e48",
      "name": "Samsung Galaxy",
      "id": "b29b18f5-d9a9-44ca-9535-86f407fd8ac0",
      count: 5
    },
    {
      "name": "Minimalist Ceramic Vase",
      "img": "https://firebasestorage.googleapis.com/v0/b/shop-cffec.firebasestorage.app/o/477rycF7GFg17Xthw2aMU8xY0tX2%2Fbe789093-9f34-4a1b-a177-be8cfff8bb0d?alt=media&token=3f5232c7-58d3-487d-bebc-6f269bc1ced9",
      "id": "be789093-9f34-4a1b-a177-be8cfff8bb0d",
      "price": 890,
      "currency": "UAH",
      "count": 3
    },

  ]
}





