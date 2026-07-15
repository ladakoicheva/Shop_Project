import { useEffect, useState } from 'react'
import { getHistory } from '../../services/firebase/db/history';
import HistoryItemCard from './ui/HistoryItemCard/HistoryItemCard';
import { Autorisation_HOC } from '../../HOC/Autorisation_HOC';
import { connectLiveHistorySum } from '../../services/firebase/socket/history';
import { getHistoryPagination, updateTotal } from '../../redux/history/history';
import { useAppSelector } from '../../redux/type';
import { useAppDispatch } from '../../redux/type';

export const History = () => {
  const history = useAppSelector((s) => s.history);
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((s) => s.auth)
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false)

  useEffect(() => {
    if(!user)return
    const callback = (data: number) => {
      const total = +data
      dispatch(updateTotal(total))

    }
    const unsubscribe = connectLiveHistorySum(callback, user.uid!)

    return unsubscribe;

  }, [user?.uid])


  const getNextHistoryItems = async () => {
    if (isLoading && !user) return;
    setIsLoading(true);
    const res = await getHistory(user?.uid!);
    if(!res.data ||res.data.length === 0 )setIsEnd(true);

    if (res.ok ) {

      dispatch(getHistoryPagination(res.data!));

    }

    setIsLoading(false)

  }

  const onAddHistory = (e:React.UIEvent<HTMLElement>) => {

    if (isEnd) return;

    const teg = e.target as HTMLElement;;
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
        <HistoryItemCard key={index} purchase={el} user ={user} />
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