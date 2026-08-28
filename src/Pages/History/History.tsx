import { useEffect, useMemo, useState } from 'react'
import { getHistory } from '../../services/firebase/db/history';
import HistoryItemCard from './ui/HistoryItemCard/HistoryItemCard';
import { Autorisation_HOC } from '../../HOC/Autorisation_HOC';
import { connectLiveHistorySum } from '../../services/firebase/socket/history';
import { getHistoryPagination, updateTotal } from '../../redux/history/history';
import { useAppSelector } from '../../redux/type';
import { useAppDispatch } from '../../redux/type';

import styles from './History.module.css';

import { NoFound } from '../../uix/NoFound';

export const History = () => {
  const history = useAppSelector((s) => s.history);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (!user) return;
    const callback = (data: number) => {
      const total = +data;
      dispatch(updateTotal(total));
    };
    const unsubscribe = connectLiveHistorySum(callback, user.uid!);
    return unsubscribe;
  }, [user?.uid]);

  const memoCards = useMemo(() => {
    return history.history.map((el, index) => (
      <HistoryItemCard key={index} purchase={el} user={user} />
    ));
  }, [history.history, user]);

  const getNextHistoryItems = async () => {
    if (isLoading && !user) return;
    setIsLoading(true);
    const res = await getHistory(user?.uid!);
    if (!res.data || res.data.length === 0) setIsEnd(true);

    if (res.ok) {
      dispatch(getHistoryPagination(res.data!));
    }
    setIsLoading(false);
  };

  const onAddHistory = (e: React.UIEvent<HTMLElement>) => {
    if (isEnd) return;
    const teg = e.target as HTMLElement;
    const scrollHeight = +teg.scrollHeight;
    const scrollTop = +teg.scrollTop;
    const offsetHeight = +teg.offsetHeight;

    if (scrollHeight - scrollTop - offsetHeight <= 100) {
      getNextHistoryItems();
    }
  };

  if (history.history.length === 0) {
    return (
      <div className={styles.historyContainer}>
        <div className={styles.historyHeader}>
          <div className={styles.titleGroup}>
            <h1>Purchase History</h1>
            <p>Track and manage your previous orders</p>
          </div>
        </div>
        <NoFound
          type="history"
          title="No Purchases Yet"
          subtitle="Your completed orders and purchase history will appear here once you place an order."
          actionLabel="Explore Catalog"
          actionTo="/"
        />
      </div>
    );
  }

  return (
    <div className={styles.historyContainer} onScroll={onAddHistory}>
      <div className={styles.historyHeader}>
        <div className={styles.titleGroup}>
          <h1>Purchase History</h1>
          <p>Track and manage your previous orders</p>
        </div>
        <div className={styles.totalBadge}>
          <span>Total Spent:</span>
          <strong>{history.total.toLocaleString()} UAH</strong>
        </div>
      </div>
      <div className={styles.cardsList}>
        {memoCards}
      </div>
    </div>
  );
};






// const arr = ['a', 's', 'd', 'f', 'g']

// const log = (q) => {
//   console.log(q);
// }

// log(...arr)
// log('a', 's', 'd', 'f', 'g')
const HistoryPage = Autorisation_HOC(History)
export default HistoryPage;