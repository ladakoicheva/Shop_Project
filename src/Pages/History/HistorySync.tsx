import  { useEffect } from 'react'
import { getHistory } from '../../services/firebase/db/history';
import { syncHistory } from '../../redux/history/history';
import { useAppDispatch, useAppSelector } from '../../redux/type';

export default function HistorySync() {
  const auth = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch()
  const loading = useAppSelector((s) => s.loading)


  useEffect(() => {
    if(!auth.user) return

    const getUserHistory = async () => {

      const res = await getHistory(auth.user?.uid!)
      if (!res.data) return
      
      if (res.ok) {
        dispatch(syncHistory(res.data))
      }
    }
    if (!loading.isLoadingApp && auth.user?.uid) {
      getUserHistory()
    }
    return () => {
      dispatch(syncHistory([]))

    };

  }, [auth.user, loading.isLoadingApp])

  return null
}
