import { createContext, useContext, useEffect, useState } from "react";
import { getAllProducts } from "../services/firebase/db/products";
import { TYPE_MODAL } from "../Components/Forms/typeModeHelper";
import { onRegistartionApi, onLoginApi } from "../services/firebase/auth";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { APP_AUTH } from "../services/firebase";
import { getSettings } from '../services/firebase/db/settings';
import { removeProduct, editProduct } from "../services/firebase/db/products";
import { addProductToFav, deleteProductFromFav } from "../services/firebase/db/favProducts";
import { getAllFavProducts } from "../services/firebase/db/favProducts";
import styled from "@emotion/styled";


// const f = {
//   favorites: {
//     uid : ['idProduct'],
//  uid2 : [adasda,'asdad]
//   }
// }


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
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null)
  const [modalOpen, setModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState(TYPE_MODAL.SING_UP);
  const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket')) || {}); // {} 
  const [loading, setLoading] = useState(false);
  const [isLoadingApp, setIsLoadingApp] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [currentUID, setCurrentUID] = useState('')
  const [settings, setSettings] = useState({

  })
  // const [menuConf, setMenuConf] = useState(JSON.parse(localStorage.getItem('menuConf'))|| {
  //   isOpen: false,
  //   clickedItem:'',

  // });

  const isLogin = !!user;

  // const getFav = async () => {
  //   const res = await getAllFavProducts(user.uid)
  //   if (res.ok ) setFavorites(res.data)
  // }
  // if (user && !isLoadingApp) {
  //   getFav();
  // }



  const addToFav = async (ownersUid, productId) => {

    const res = await addProductToFav(user.uid, ownersUid, productId)
    if (res.ok) {
      favorites.push(productId)
      console.log(favorites)

      setFavorites([...favorites]);
    } else {
      console.log(res.text)
    }



    // const copy = { ...favorites };
    // copy[uid] ? copy[uid].push(id) : copy = { [uid]: [id] };


  }

  const deleteItemFromFav = async (ownersUid, productId) => {

    const res = await deleteProductFromFav(user.uid, ownersUid, productId)
    if (res.ok) {
      const copy = [...favorites]
      const index = copy.indexOf(productId)
      if (index !== -1) {
        copy.splice(index, 1);
        setFavorites(copy);
      }

    } else {
      console.log(res.text);
    }

  }


  const updateStyles = (data, type) => {
    console.log(data, type)
    const copy = { ...settings };
    copy[type] = data;
    setSettings(copy)
  }



  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket))
  }, [basket])



  useEffect(() => {
   

    onAuthStateChanged(APP_AUTH, (user) => {



      if (user) {
        setUser(user)
        const getFav = async () => {
          const res = await getAllFavProducts(user.uid)
          if (res.ok) setFavorites(res.data)

          const response = await getSettings(user.uid);
          if (response.ok) setSettings(response.data)
        }
        // const getUserSettings = async () => {
        //   const res = await getSettings(user.uid)
        //   console.log(res)
        //   if (res) {
        //     const data = { name: [res.namecolor, res.namefontSize], price: [res.pricecolor, res.pricefontSize], bg: [res.bgbg] }
        //     setCardStyle(data)
        //   }
        //   console.log(res.ok)
        // }
        //запрос на все избранные продукты
        getFav()
        // getUserSettings ()

      } else {
        setUser(null)
      }
      setIsLoadingApp(false)
    })
  }, [])


  const setProductsData = (data, currentUID) => {
    //! old user 
    if (!user) return;
    const uid = user.uid;
    if (currentUID === uid) setProducts(data);
  }


  const deleteProduct = async (product, uid, id) => {
    const res = await removeProduct(product, uid, id);
    const copy = { ...basket }
    if (res.ok) {
      console.log(products)
      if (copy[id]) {
        delete copy[id];
        setBasket(copy);
      }
      const filtered = products.filter((el) => el.id !== id);

      setProducts(filtered);
    }

  }


  const editProductData = async (uid, id, newData, file) => {
    const res = await editProduct(uid, id, newData, file);


    if (res.ok) {
      const copy = [...products]
      const basketCopy = { ...basket };
      const index = copy.findIndex((el) => el.id == id);
      copy[index] = { ...copy[index], ...res.data };

      if (basketCopy[id]) {
        basketCopy[id].product = { ...basketCopy[id].product, ...res.data };
        setBasket(basketCopy)
      }

      setProducts(copy)

      return res.data
    }


  }


  //basket

  const addToBasket = (product) => {

    const copy = { ...basket }
    const id = product.id
    if (copy[id]) {
      copy[id].count++;
    } else {
      copy[id] = { product: product, count: 1 }
    }
    //! error sheme
    setBasket(copy)
  }

  const deleteFromBasket = (product) => {
    const copy = { ...basket }
    const id = product.id
    copy[id].count--
    if (copy[id].count === 0) delete copy[id];

    setBasket(copy)
  }






  //auth

  const onLogin = async (email, password) => {
    const userData = await onLoginApi(email, password);
    if (userData.ok) {
      setUser(userData.data);
    }
    return { ok: userData.ok, message: userData.message, code: userData.code }

  }

  const logOut = async () => {
    try {
      const res = await signOut(APP_AUTH)
      if (res) console.log('sign out successfull');
    } catch (err) {
      console.log(err);
    }


  }

  const onRegistration = async (email, password) => {

    const userData = await onRegistartionApi(email, password);

    if (userData.ok) {
      setUser(userData.data)

      //показать уведомление
    }
    return { ok: userData.ok, message: userData.message, code: userData.code }
  }




  const openLoading = () => {
    setLoading(true);
  }
  const closeLoading = () => {
    setLoading(false);
  }

  return {
    products,
    setProductsData,
    user,
    isLogin,
    onRegistration,
    onLogin,
    setUser,
    modalOpen,
    setModalOpen,
    authMode,
    setAuthMode,
    logOut,
    addToBasket,
    deleteFromBasket,
    basket,
    loading,
    openLoading,
    closeLoading,
    editProductData,
    deleteProduct,
    isLoadingApp,
    addToFav,
    deleteItemFromFav,
    favorites,
    setFavorites,
    currentUID,
    setCurrentUID,
    settings,
    updateStyles



  }
}

export const useStoreContext = () => useContext(StoreContext);

//1 create Context 
// 2 connect context with your project 
// 3 get Data