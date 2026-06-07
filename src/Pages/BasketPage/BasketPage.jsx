import { useState } from "react";
import { useStoreContext } from "../../store/store";

export default function BasketPage() {
  const { basket } = useStoreContext();
  const [showBasket, setShowBasket] = useState(Object.entries(basket));
 
  return (
    <ul>{
      showBasket.map((el) => <li key={el[1].product.id}>name: {el[1].product.name} count: {el[1].count}</li>)
    }</ul>
  )
}
