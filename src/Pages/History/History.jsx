import React, { useRef } from 'react'
import { useStoreContext } from '../../store/store'


export default function History() {
  const store = useStoreContext();


  console.log(store.history)

  const onAddHistory = (e) => {


    const teg = e.target;
    const scrollHeight = +teg.scrollHeight; // Высота скрола
    const scrollTop = +teg.scrollTop; // высота проскроленого
    const offsetHeight = +teg.offsetHeight; // высота кубика 


    if (scrollHeight - scrollTop - offsetHeight <= 50) {
      store.getNextHistoryItems();


    }

  }


  return (


    <div onScroll={onAddHistory} style={{ width: '100vw', height: '50vh', overflow: 'auto', background: 'green' }}>

      {store.history.items.map((el, index) => (
        <div key={index} style={{ margin: '50px', background: 'red', padding: '20px' }}>

          <h3>{el.date}</h3>

          <ul>
            {el.products.map((product) => (
              <li key={product.id}>
                {product.name}
              </li>
            ))}
          </ul>

        </div>
      ))}
    </div>

  )
}
