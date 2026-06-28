import { useEffect, useState } from 'react'
import { getHistory } from '../../services/firebase/db/history';
import HistoryItemCard from './ui/HistoryItemCard/HistoryItemCard';
import { Autorisation_HOC } from '../../HOC/Autorisation_HOC';
import { connectLiveHistorySum } from '../../services/firebase/socket/history';

export const History = ({auth,historyContext}) => {
  const history = historyContext
  const { user } = auth
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false)

  useEffect(() => {
    const callback = (data) => {
      history.updateTotal(data)

    }
    const unsubscribe = connectLiveHistorySum(callback, user.uid)

    return unsubscribe;
  
  }, [history,user.uid])


  const getNextHistoryItems = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const res = await getHistory(user.uid);


    if (res.ok) {

      if (res.data.length === 0) {
        setIsEnd(true);
      }
      history.updateHistory(res.data);

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

  if (history.history.length === 0) return <div>No items</div>


  return (


    <div onScroll={onAddHistory} style={{ height: 'calc(100vh - 60px)', overflow: 'auto', }}>
      <h1>{history.total}</h1>
      {history.history.map((el, index) => (
        <HistoryItemCard key={index} purchase={el} user={user} addToArchive={history.addToHistoryArchive} />
      ))}
    </div>

  )
}





// const arr = ['a', 's', 'd', 'f', 'g']

// const log = (q) => {
//   console.log(q);
// }

// log(...arr)
// log('a', 's', 'd', 'f', 'g')
const HistoryPage = Autorisation_HOC(History)
export default HistoryPage;