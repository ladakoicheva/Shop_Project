import { useEffect, useMemo, useState } from 'react';
import { getHistory } from '../../services/firebase/db/history';
import HistoryItemCard from './ui/HistoryItemCard/HistoryItemCard';
import { Autorisation_HOC } from '../../HOC/Autorisation_HOC';
import { connectLiveHistorySum } from '../../services/firebase/socket/history';
import { getHistoryPagination, updateTotal } from '../../redux/history/history';
import { useAppSelector, useAppDispatch } from '../../redux/type';
import { HistoryIcon } from '../../utils/svgIcons';

export const History = () => {
  const history = useAppSelector((s) => s.history);
  const settings = useAppSelector((s) => s.auth.settings);
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
  }, [user, dispatch]);

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

    if (res.ok && res.data) {
      dispatch(getHistoryPagination(res.data));
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
      <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>История покупок пуста</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Оформите свой первый заказ в магазине!</p>
      </div>
    );
  }

  return (
    <div onScroll={onAddHistory} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
          border: '1px solid #a7f3d0',
          borderRadius: '20px',
          padding: '1.5rem',
          maxWidth: '600px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          boxShadow: '0 4px 14px rgba(16, 185, 129, 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <HistoryIcon size={28} color="#059669" />
          <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#065f46' }}>
            Всего потрачено:
          </span>
        </div>

        <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#059669' }}>
          {history.total} {settings?.currency || 'UAH'}
        </span>
      </div>

      <div>{memoCards}</div>
    </div>
  );
};

const HistoryPage = Autorisation_HOC(History);
export default HistoryPage;