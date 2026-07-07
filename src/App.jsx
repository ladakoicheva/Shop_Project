import './App.css'
import CurrentProductPage from './Pages/CurrentProductPage/СurrentProductPage.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProducts from './Pages/AddProdcuts';
import Products from './Pages/ProductPage/Products';
import Header from './Components/Header/Header';
import BasketPage from './Pages/BasketPage/BasketPage.jsx';
import Loading from './Components/Loading/Loading.jsx'
import ProductsForm from './Components/Forms/ProductsForm/ProductsForm.jsx';
import Setting from './Pages/Setting/Setting.jsx';
import NoFound from './Pages/404Page/NoFound.jsx';
import FilterBg from './Components/FilterBg/ShopName.jsx';
import History from './Pages/History/History.jsx';
import HistoryItemPage from './Pages/History/HistoryItemPage/HistoryItemPage.jsx';
import useFav, { FavContext } from './store/features/useFav.js';
import useProductManager from './store/features/useProductManager.js';
import { ProductContext } from './store/features/useProductManager.js';
import { HistoryContext } from './store/features/useHistory.js';
import useHistory from './store/features/useHistory.js';
import Test from './Components/Test.jsx';
import { LocalStorageComponent } from './LocalStorage/LocalStorageComponent.jsx';
import useBasket from './store/features/useBasket.js';
import useAuth from './store/features/useAuth.js';


function App() {
  // Сделать голосовые сообщение, распознавание голоса и голосовой ввод.


  const user = useAuth();
  const basket = useBasket((s)=>s.data.basket)
  const fav = useFav({ auth: user });
  const history = useHistory({ auth: user })
  const products = useProductManager({ user: user.user, basket: basket });


  return (
    <BrowserRouter >
          <ProductContext.Provider value={products}>

            <Header auth={user}  />
            <Loading />
            <FavContext.Provider value={fav}>
              <HistoryContext.Provider value={history}>
                <Routes>
                  <Route path='/add' element={<AddProducts  />} />
                  <Route path='/products/:uid' element={<Products  productManager={products}  />} />
                  <Route path='/products/:uid/product/:id' element={<CurrentProductPage/>} />
                  <Route path='basket' element={<BasketPage historyContext={history}  />} />
                  <Route path='setting' element={<Setting  />} />
                  <Route path='history' element={<History  historyContext={history} />} />
                  <Route path='/history/:id' element={<HistoryItemPage  />} />
                  <Route path='*' element={<NoFound />}></Route>
                  <Route path='test' element={<Test />}></Route>
              </Routes>
              
                <LocalStorageComponent />
              </HistoryContext.Provider>
            </FavContext.Provider>
          </ProductContext.Provider>
    </BrowserRouter>
  )
}

export default App
