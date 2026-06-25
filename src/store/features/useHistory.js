import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { getHistory } from "../../services/firebase/db/history";
import { archieveItem } from "../../services/firebase/db/history";

export const HistoryContext = createContext({})

export default function useHistory({ user, isLoading }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {

    const getUserHistory = async () => {
      const res = await getHistory(user.uid)

      if (res.ok) {
        setHistory(res.data);
      } else {
        console.log(res.e)
      }
    }
    if (user && !isLoading) {
      getUserHistory()
    } else {
      setHistory([])
    }

  }, [user,isLoading])

  const updateHistory = (data) => {

    setHistory((prev) => [...prev,
    ...data])
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
  })
}

export const useHistoryContext = () => useContext(HistoryContext);