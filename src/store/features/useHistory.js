import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { getHistory } from "../../services/firebase/db/history";
import { archieveItem } from "../../services/firebase/db/history";

export const HistoryContext = createContext({})

export default function useHistory({  auth }) {
  const [history, setHistory] = useState([]);
  const [total, setTotal] = useState(0)

  useEffect(() => {

    let ignore = false;

    const getUserHistory = async () => {


      const res = await getHistory(auth.user.uid)
      // const total = await getTotal(user.uid);
      if (res.ok && !ignore) {
        setHistory(res.data);
        // setTotal(total.data)
      }
    }
    if (auth.user?.uid && !auth.isLoading) {
      getUserHistory()
    }
    return () => {
      setHistory([]);
      ignore = true;
    };

  }, [auth.user, auth.isLoading])

  const updateHistory = (data) => {

    setHistory((prev) => [...prev,
    ...data])
  }
  const updateTotal = (sum) => {
    setTotal(sum)
  }

  const getHistoryBasketUpdate = (data) => {
    setHistory(prev=>[data, ...prev])
  }

  const addToHistoryArchive = async (id) => {
    const res = await archieveItem(auth.user.uid, id)
    if (res.ok) {
      const historyCopy = [...history];
      const index = historyCopy.findIndex((purchase) => purchase.id == id)
      historyCopy.splice(index, 1);
      setHistory(historyCopy);
    }
  }
  return ({
    history,
    updateHistory,
    addToHistoryArchive,
    getHistoryBasketUpdate,
    total,
    updateTotal
  })
}

export const useHistoryContext = () => useContext(HistoryContext);