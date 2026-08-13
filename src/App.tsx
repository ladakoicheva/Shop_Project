import './App.css'
import CurrentProductPage from './Pages/CurrentProductPage/СurrentProductPage.js'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProducts from './Pages/AddProdcuts.js';
import Products from './Pages/ProductPage/Products.js';
import Header from './Components/Header/Header.js';
import BasketPage from './Pages/BasketPage/BasketPage.js';
import Loading from './Components/Loading/Loading.js'
import Setting from './Pages/Setting/Setting.js';
import NoFound from './Pages/404Page/NoFound.js';
import History from './Pages/History/History.js';
import HistoryItemPage from './Pages/History/HistoryItemPage/HistoryItemPage.js';
import { LocalStorageComponent } from './LocalStorage/LocalStorageComponent.js';
import HistorySync from './Pages/History/HistorySync.js'
import FavSync from './Components/FavSync.js';
import Admin from './Pages/AdminPage/Admin.js';
import { useAppDispatch, useAppSelector } from './redux/type.js';
import { useEffect } from 'react';
import { connectToApp } from './redux/think.js';
import Chat from './Pages/BasketPage/userChatModal/Chat.js';


function App() {
  const { isAdmin,user } = useAppSelector((s) => s.auth)
  const { isLoadingApp,isLoading} = useAppSelector((s) => s.loading)
  
  const dispatch = useAppDispatch();
  console.log(isLoadingApp)
  
  useEffect(() => {
      dispatch(connectToApp())//! autorisation user ...
  }, [])
  if (isLoadingApp ) return <Loading /> 
  

  // Сделать голосовые сообщение, распознавание голоса и голосовой ввод.
  return (
  
    <BrowserRouter >

            <Header  />
          
      {!isAdmin && <Chat />}
           
      {!isAdmin ? <Routes>
         
        <Route path='/add' element={<AddProducts />} />
        <Route path='/products/:uid' element={<Products />} />
        <Route path='/products/:uid/product/:id' element={<CurrentProductPage />} />
        <Route path='basket' element={<BasketPage />} />
        <Route path='setting' element={<Setting />} />
        <Route path='history' element={<History />} />
        <Route path='/history/:id' element={<HistoryItemPage />} />
        <Route path='*' element={<NoFound />}></Route> 
      </Routes> : <Routes>
          <Route path='/:email' element={ <Admin />}/>
      </Routes>}
    
      <HistorySync />
        <FavSync/>
        <LocalStorageComponent />
        
           
         
    </BrowserRouter>
  )
}

export default App
