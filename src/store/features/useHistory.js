import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { getHistory } from "../../services/firebase/db/history";
import { archieveItem } from "../../services/firebase/db/history";

export const HistoryContext = createContext({})

export default function useHistory({ user, isLoading }) {
  const [history, setHistory] = useState([]);
  const [total, setTotal] = useState(0)

  useEffect(() => {

    const getUserHistory = async () => {
      const res = await getHistory(user.uid)
      // const total = await getTotal(user.uid);
      if (res.ok) {
        setHistory(res.data);
        // setTotal(total.data)
      } else {
        console.log(res.e)
      }
    }
    if (user && !isLoading) {
      getUserHistory()
    }
    return () => {
      setHistory([]);
    };

  }, [user, isLoading])

  const updateHistory = (data) => {

    setHistory((prev) => [...prev,
    ...data])
  }
  const updateTotal = (sum) => {
    setTotal(sum)
  }

  const getHistoryBasketUpdate = (data) => {
    setHistory([data, ...history])
  }

  const addToHistoryArchive = async (id) => {
    const res = await archieveItem(user.uid, id)
    if (res.ok) {
      const historyCopy = [...history];
      const index = historyCopy.findIndex((purchase) => purchase.id == id)
      historyCopy.splice(index, 1);
      setHistory(historyCopy);
    } else {
      console.log(res.e)
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