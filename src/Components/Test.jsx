import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Test() {
  // const d = useSelector((s) => s.test.name)
  // const myName = useSelector((s) => s.test2.name)
  const myBasket = useSelector((s) => s.basket);
  // const s = useSelector((s) => s)

  console.log(myBasket);
  



  
  const [items, setItems] = useState([
    { id: 1, text: "Первый элемент" },
    { id: 2, text: "Второй элемент" },
  ]);

  const [value, setValue] = useState('')
  console.log(items);

  useEffect(() => {
    // setInterval(() => {
    //   const fun = (items) => {
    //     console.log(items);
    //     return items
    //   }

    //   setItems(fun)
    // }, 2000)
    
  }, [])

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      text: `Элемент ${items.length + 1}`,
    };

    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };


  console.log(value);
  
  return (
    <div>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
      <button onClick={addItem}>Добавить</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => removeItem(item.id)}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}