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
import useBasket from './store/features/useBasket.js';
import { BasketContext } from './store/features/useBasket.js';
import useAuth from './store/features/useAuth.js';
import { AuthContext } from './store/features/useAuth.js';
import useFav, { FavContext } from './store/features/useFav.js';
import useProductManager from './store/features/useProductManager.js';
import { ProductContext } from './store/features/useProductManager.js';
import { HistoryContext } from './store/features/useHistory.js';
import useHistory from './store/features/useHistory.js';


function App() {
  // Сделать голосовые сообщение, распознавание голоса и голосовой ввод.

  const basket = useBasket();
  const user = useAuth();
  const fav = useFav({ user: user.user, isLoading: user.isLoadingApp });
  const history = useHistory({ user: user.user, isLoading: user.isLoadingApp })
  const products = useProductManager({ user: user.user, basket: basket.basket, updateBasketEditProduct: basket.updateBasketEditProduct });


  return (
    <BrowserRouter >
      <AuthContext.Provider value={user}>
        <BasketContext.Provider value={basket} >
          <ProductContext.Provider value={products}>
            <Header />
            {user.loading && <Loading />}
            <FavContext.Provider value={fav}>
              <HistoryContext.Provider value={history}>
                <Routes>
                  <Route path='/add' element={<AddProducts auth={user} />} />
                  <Route path='/products/:uid' element={<Products auth={user} productManager={products} />} />
                  <Route path='/products/:uid/product/:id' element={<CurrentProductPage basketContext={basket} auth={user} />} />
                  <Route path='basket' element={<BasketPage basketContext={basket} historyContext={history} auth={user} />} />
                  <Route path='setting' element={<Setting auth={user} />} />
                  <Route path='history' element={<History auth={user} historyContext={history} />} />
                  <Route path='/history/:id' element={<HistoryItemPage auth={user} />} />
                  <Route path='*' element={<NoFound />}></Route>
                </Routes>
              </HistoryContext.Provider>
            </FavContext.Provider>
          </ProductContext.Provider>
        </BasketContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App
