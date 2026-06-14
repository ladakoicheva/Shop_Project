import './App.css'
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import AddProducts from './Pages/AddProdcuts';
import Products from './Pages/ProductPage/Products';
import СurrentProductPage from './Pages/CurrentProductPage/СurrentProductPage.jsx'
import Header from './Components/Header/Header';
import { StoreContext, useStore } from './store/store';
import BasketPage from './Pages/BasketPage/BasketPage.jsx';
import Loading from './Components/Loading/Loading.jsx'
import ProductsForm from './Components/Forms/ProductsForm/ProductsForm.jsx';
import Setting from './Pages/Setting/Setting.jsx';
import NoFound from './Pages/404Page/NoFound.jsx';
import { getSettings } from './services/firebase/db/settings.js';
import FilterBg from './Components/FilterBg/ShopName.jsx';


function App() {
  // Сделать голосовые сообщение, распознавание голоса и голосовой ввод.
  const store = useStore()



  return (
    <BrowserRouter >
      <StoreContext.Provider value={store} >
        <Header />
        {store.loading && <Loading />}

        <Routes>
          <Route path='/add' element={<AddProducts />} />
          <Route path='/products/:uid' element={<Products />} />
          <Route path='/products/:uid/product/:id' element={<СurrentProductPage />} />
          <Route path='basket' element={<BasketPage />} />
          <Route path='setting' element={<Setting />} />
          <Route path='*' element={<NoFound />}></Route>
        </Routes>
      </StoreContext.Provider>
    </BrowserRouter>
  )
}

export default App
