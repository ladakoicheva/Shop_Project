import { useState } from "react";
import { useStoreContext } from "../../store/store";
import useBasket from "../../store/features/useBasket";

export default function BasketPage() {
  const { basket } = useBasket()
  const [showBasket, setShowBasket] = useState(Object.entries(basket));
 
  return (
    <ul>{
      showBasket.map((el) => <li key={el[1].product.id}>name: {el[1].product.name} count: {el[1].count}</li>)
    }</ul>
  )
}
