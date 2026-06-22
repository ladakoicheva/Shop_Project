import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { APP_AUTH } from "../services/firebase";
import { getSettings } from '../services/firebase/db/settings';
import { TYPE_MODAL } from "../Components/Forms/typeModeHelper";
import useBasket from "./features/useBasket";
import { getAllFavProducts } from "../services/firebase/db/favProducts";
import { getHistory } from "../services/firebase/db/history";


export const StoreContext = createContext({
  products: [],
  addNewProduct: () => { },
  onRegistration: () => { },
  onLogin: () => { },
  setUser: () => { },
  modalOpen: false,
  setModalOpen: () => { },
  authMode: "",
  setAuthMode: () => { },
})



export const useStore = () => {
  const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket')) || {}); // {} 
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState(TYPE_MODAL.SING_UP);
  const [isLoadingApp, setIsLoadingApp] = useState(true);
  const isLogin = !!user;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [settings, setSettings] = useState({
    bgbg: "rgba(255,255,255)",
    name: "shop",
    namecolor: "rgba(255,242,242)",
    namefontSize: "30",
    pricecolor: "black",
    pricefontSize: "24"
  })


  useEffect(() => {
    onAuthStateChanged(APP_AUTH, (user) => {
      if (user) {
        setUser(user)

        const getUserHistory = async () => {
          const res = await getHistory(user.uid)

          if (res.ok) {
            setHistory(res.data);
          } else {
            console.log(res.e)
          }
        }
        const getFav = async () => {
          const res = await getAllFavProducts(user.uid)
          if (res.ok) setFavorites(res.data)

          const response = await getSettings(user.uid);
          if (response.ok) setSettings(prev => ({ ...prev, ...response.data }))
        }

        getFav()
        getUserHistory()

      } else {
        setUser(null)
      }
      setIsLoadingApp(false)
    })
  }, [])






  const updateStyles = (newSettingsObject) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      ...newSettingsObject
    }));
  };
  const updateHistory = (data) => {

    setHistory([...history,
    ...data])
  }


  const openLoading = () => {
    setLoading(true);
  }
  const closeLoading = () => {
    setLoading(false);
  }

  return {
    products,
    setProducts,
    user,
    isLogin,
    setUser,
    authMode,
    setAuthMode,
    basket,
    setBasket,
    loading,
    openLoading,
    closeLoading,
    setIsLoadingApp,
    isLoadingApp,
    setIsLoadingApp,
    favorites,
    setFavorites,
    settings,
    updateStyles,
    history,
    updateHistory,
    setHistory,



  }
}

export const useStoreContext = () => useContext(StoreContext);

//1 create Context 
// 2 connect context with your project 
// 3 get Data