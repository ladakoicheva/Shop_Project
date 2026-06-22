import { useEffect, useState } from 'react'
import { useStoreContext } from '../../store/store'
import { getHistory } from '../../services/firebase/db/history';
import HistoryItemCard from './ui/HistoryItemCard/HistoryItemCard';
import { Autorisation_HOC } from '../../HOC/Autorisation_HOC';


const History = () => {
  const store = useStoreContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false)


  const getNextHistoryItems = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const res = await getHistory(store.user.uid);


    if (res.ok) {

      if (!res.data || res.data.length === 0) {
        setIsEnd(true);
      }
      store.updateHistory(res.data);
    }
    setIsLoading(false)

  }

  const onAddHistory = (e) => {
    if (isEnd) return;

    const teg = e.target;
    const scrollHeight = +teg.scrollHeight; // Высота скрола
    const scrollTop = +teg.scrollTop; // высота проскроленого
    const offsetHeight = +teg.offsetHeight; // высота кубика 
  

    if (scrollHeight - scrollTop - offsetHeight <= 100) {


      getNextHistoryItems();


    }

  }


  return (


    <div onScroll={onAddHistory} style={{ width: '100vw', height: '70vh', overflow: 'auto', }}>

      {store.history.map((el,index) => (
        <HistoryItemCard key={index} purchase={el} />
      ))}
    </div>

  )
}

// создать новую пейджу и Route
// по клику перенаправлять на history/:id(LINK)
// get запрос (по айди покупки,его получаем с юрл) .локальный хук и отрабатыввает юзефект при каждом изменении айди
// вывести на страницу всю информацию о конкретной покупке



// const arr = ['a', 's', 'd', 'f', 'g']

// const log = (q) => {
//   console.log(q);
// }

// log(...arr)
// log('a', 's', 'd', 'f', 'g')
export default Autorisation_HOC(History)